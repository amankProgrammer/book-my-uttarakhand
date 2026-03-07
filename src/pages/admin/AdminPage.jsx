import React, { useEffect, useMemo, useState } from 'react';
import './admin.css';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import useCmsCollection from '../../hooks/useCmsCollection';
import { auth, db, firebaseEnabled, storage } from '../../firebase/client';
import {
  defaultHeroSlides,
  defaultHomeDestinations,
  defaultHomePackages,
  uttarakhandDestinations,
  uttarakhandTourPackages,
  galleryItems,
} from '../../cms/defaultContent';
import { defaultFlatHotels } from '../HotelsResorts';

function parseBootstrapEmails() {
  const raw = import.meta.env.VITE_BOOTSTRAP_ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map((v) => String(v).trim().toLowerCase())
    .filter(Boolean);
}

function canBootstrap(email) {
  if (!email) return false;
  const list = parseBootstrapEmails();
  return list.includes(String(email).trim().toLowerCase());
}

function formatList(value) {
  if (Array.isArray(value)) return value.join('\n');
  return '';
}

function parseList(value) {
  return String(value || '')
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}

async function safeDeleteStoragePath(path) {
  if (!storage || !path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch {
    // ignore
  }
}

async function uploadAndSet({
  collectionKey,
  docId,
  file,
  folder,
  urlField,
  pathField,
  existingPath,
}) {
  if (!storage || !db) throw new Error('Firebase is not configured.');
  if (!file) throw new Error('No file selected.');
  if (!collectionKey || !docId) throw new Error('Missing collection/doc id.');

  const safeName = String(file.name || 'upload').replace(/[^\w.-]+/g, '-');
  const storagePath = `cms/${collectionKey}/${docId}/${folder}/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  if (existingPath) {
    await safeDeleteStoragePath(existingPath);
  }

  await updateDoc(doc(db, collectionKey, docId), {
    [urlField]: url,
    [pathField]: storagePath,
    updatedAt: serverTimestamp(),
  });
}

function AdminLogin({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      setStatus('success');
      onLoggedIn?.(cred.user);
    } catch (err) {
      setStatus('error');
      setMessage(err?.message || 'Login failed.');
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-title">Admin Panel</h1>
            <div className="admin-muted">Sign in with Firebase Email/Password auth.</div>
          </div>
        </div>

        <form onSubmit={submit} className="admin-split" noValidate>
          <div className="admin-kv">
            <label htmlFor="adminEmail">Email</label>
            <input
              id="adminEmail"
              className="admin-input"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="adminPassword">Password</label>
            <input
              id="adminPassword"
              className="admin-input"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <div>
            <button className="admin-btn primary" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Signing in…' : 'Sign in'}
            </button>
            {message ? <p className="admin-muted" style={{ marginTop: 10 }}>{message}</p> : null}
            <p className="admin-muted" style={{ marginTop: 10 }}>
              Tip: Add your email to <code>VITE_BOOTSTRAP_ADMIN_EMAILS</code> once to bootstrap access in rules.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function CollectionManager({ schema, isAdmin }) {
  const { items, status, error } = useCmsCollection(schema.key, { live: true });
  const [selectedId, setSelectedId] = useState('');
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState(false);
  const selected = useMemo(
    () => items.find((it) => it.id === selectedId) || null,
    [items, selectedId]
  );

  useEffect(() => {
    if (!items.length) {
      setSelectedId('');
      return;
    }
    if (!selectedId) {
      setSelectedId(items[0].id);
      return;
    }
    if (!items.some((it) => it.id === selectedId)) {
      setSelectedId(items[0].id);
    }
  }, [items, selectedId]);

  useEffect(() => {
    if (!selected) {
      setDraft(null);
      return;
    }
    const next = {};
    for (const field of schema.fields) {
      next[field.key] = selected[field.key] ?? field.defaultValue ?? '';
    }
    setDraft(next);
  }, [schema.fields, selected]);

  const addNew = async () => {
    if (!isAdmin) return;
    setBusy(true);
    try {
      const nextOrder = (items.at(-1)?.order || items.length || 0) + 1;
      const payload = {
        order: nextOrder,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      for (const field of schema.fields) {
        if (field.key === 'order') continue;
        payload[field.key] = field.defaultValue ?? '';
      }
      const created = await addDoc(collection(db, schema.key), payload);
      setSelectedId(created.id);
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!isAdmin || !selected || !draft) return;
    setBusy(true);
    try {
      const payload = { ...draft, updatedAt: serverTimestamp() };
      for (const field of schema.fields) {
        if (field.type === 'lines') {
          payload[field.key] = parseList(draft[field.key]);
        }
        if (field.type === 'number') {
          const parsed = Number(draft[field.key]);
          payload[field.key] = Number.isFinite(parsed) ? parsed : 0;
        }
      }
      await updateDoc(doc(db, schema.key, selected.id), payload);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!isAdmin || !selected) return;
    if (!window.confirm('Delete this item?')) return;
    setBusy(true);
    try {
      for (const upload of schema.uploads || []) {
        const existingPath = selected[upload.pathField];
        if (existingPath) {
          await safeDeleteStoragePath(existingPath);
        }
      }
      await deleteDoc(doc(db, schema.key, selected.id));
      setSelectedId('');
    } finally {
      setBusy(false);
    }
  };

  const updateDraft = (key, value) => {
    setDraft((prev) => ({ ...(prev || {}), [key]: value }));
  };

  const seedDefaults = async () => {
    if (!isAdmin || !schema.seedDefaults?.length) return;
    if (!window.confirm(`Seed ${schema.label} with defaults? This will add new items.`)) return;
    setBusy(true);
    try {
      for (const row of schema.seedDefaults) {
        await addDoc(collection(db, schema.key), {
          ...row,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h2 className="admin-title" style={{ fontSize: 16 }}>{schema.label}</h2>
          <div className="admin-muted">
            {status === 'loading' ? 'Loading…' : status === 'error' ? 'Error' : `${items.length} item(s)`}
            {error ? ` — ${error.message}` : ''}
          </div>
        </div>

        <div className="admin-row">
          {schema.seedDefaults?.length ? (
            <button className="admin-btn" type="button" onClick={seedDefaults} disabled={!isAdmin || busy}>
              Seed defaults
            </button>
          ) : null}
          <button className="admin-btn primary" type="button" onClick={addNew} disabled={!isAdmin || busy}>
            Add new
          </button>
          <button className="admin-btn" type="button" onClick={save} disabled={!isAdmin || busy || !selected}>
            Save
          </button>
          <button className="admin-btn danger" type="button" onClick={remove} disabled={!isAdmin || busy || !selected}>
            Delete
          </button>
        </div>
      </div>

      <div className="admin-split">
        <div>
          <div className="admin-muted">Items</div>
          <ul className="admin-list" aria-label={`${schema.label} items`}>
            {items.map((it) => {
              const title = it[schema.displayField] || it.title || it.name || it.id;
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    className={it.id === selectedId ? 'active' : ''}
                    onClick={() => setSelectedId(it.id)}
                  >
                    {title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {!selected || !draft ? (
            <div className="admin-muted">Select an item to edit.</div>
          ) : (
            <>
              <div className="admin-kv">
                {schema.fields.map((field) => {
                  const value =
                    field.type === 'lines' ? formatList(draft[field.key]) : String(draft[field.key] ?? '');
                  const inputId = `${schema.key}-${selected.id}-${field.key}`;

                  if (field.type === 'textarea' || field.type === 'lines') {
                    return (
                      <React.Fragment key={field.key}>
                        <label htmlFor={inputId}>{field.label}</label>
                        <textarea
                          id={inputId}
                          className="admin-textarea"
                          value={value}
                          onChange={(e) => updateDraft(field.key, e.target.value)}
                          placeholder={field.placeholder || ''}
                        />
                      </React.Fragment>
                    );
                  }

                  const type = field.type === 'number' ? 'number' : 'text';
                  return (
                    <React.Fragment key={field.key}>
                      <label htmlFor={inputId}>{field.label}</label>
                      <input
                        id={inputId}
                        className="admin-input"
                        type={type}
                        value={value}
                        onChange={(e) => updateDraft(field.key, e.target.value)}
                        placeholder={field.placeholder || ''}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              {(schema.uploads || []).length ? (
                <div style={{ marginTop: 14 }}>
                  <div className="admin-muted">Uploads</div>
                  <div className="admin-row" style={{ marginTop: 8 }}>
                    {schema.uploads.map((upload) => (
                      <UploadControl
                        key={upload.urlField}
                        upload={upload}
                        schemaKey={schema.key}
                        docId={selected.id}
                        selected={selected}
                        isAdmin={isAdmin}
                        busy={busy}
                        setBusy={setBusy}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function UploadControl({ upload, schemaKey, docId, selected, isAdmin, busy, setBusy }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const doUpload = async () => {
    if (!isAdmin || !file) return;
    setBusy(true);
    setMessage('');
    try {
      await uploadAndSet({
        collectionKey: schemaKey,
        docId,
        file,
        folder: upload.folder,
        urlField: upload.urlField,
        pathField: upload.pathField,
        existingPath: selected?.[upload.pathField] || '',
      });
      setFile(null);
      setMessage('Uploaded.');
    } catch (err) {
      setMessage(err?.message || 'Upload failed.');
    } finally {
      setBusy(false);
    }
  };

  const previewUrl = selected?.[upload.urlField] || '';

  return (
    <div style={{ flex: '1 1 260px' }}>
      <div className="admin-muted" style={{ marginBottom: 6 }}>{upload.label}</div>
      {previewUrl ? (
        <div className="admin-preview" style={{ marginBottom: 8 }}>
          {upload.accept.startsWith('image') ? (
            <img src={previewUrl} alt="" />
          ) : (
            <video src={previewUrl} controls style={{ width: '100%', display: 'block' }} />
          )}
        </div>
      ) : null}
      <div className="admin-row">
        <input
          className="admin-input"
          type="file"
          accept={upload.accept}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={!isAdmin || busy}
        />
        <button className="admin-btn" type="button" onClick={doUpload} disabled={!isAdmin || busy || !file}>
          Upload
        </button>
      </div>
      {message ? <div className="admin-muted" style={{ marginTop: 6 }}>{message}</div> : null}
    </div>
  );
}

function EnquiriesPanel({ isAdmin }) {
  const { items, status, error } = useCmsCollection('enquiries', {
    live: true,
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });
  const [busy, setBusy] = useState(false);

  const remove = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm('Delete this enquiry?')) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h2 className="admin-title" style={{ fontSize: 16 }}>Enquiries</h2>
          <div className="admin-muted">
            {status === 'loading' ? 'Loading…' : status === 'error' ? 'Error' : `${items.length} enquiry(s)`}
            {error ? ` — ${error.message}` : ''}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((enquiry) => (
          <div key={enquiry.id} className="admin-card" style={{ width: '100%', margin: 0 }}>
            <div className="admin-row" style={{ justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{enquiry.name || 'Unknown'}</div>
                <div className="admin-muted">
                  {enquiry.phone || ''} {enquiry.email ? `• ${enquiry.email}` : ''}
                </div>
              </div>
              <button className="admin-btn danger" type="button" onClick={() => remove(enquiry.id)} disabled={!isAdmin || busy}>
                Delete
              </button>
            </div>
            {enquiry.message ? <p style={{ marginTop: 10, marginBottom: 0 }}>{enquiry.message}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(firebaseEnabled ? 'loading' : 'disabled');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminDocExists, setAdminDocExists] = useState(false);
  const [activeKey, setActiveKey] = useState('heroSlides');
  const [message, setMessage] = useState('');

  const schemas = useMemo(
    () => [
      {
        key: 'heroSlides',
        label: 'Hero Slides',
        displayField: 'title',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'title', label: 'Title', type: 'text', defaultValue: '' },
          { key: 'desc', label: 'Description', type: 'textarea', defaultValue: '' },
          { key: 'fallbackUrl', label: 'Fallback image URL', type: 'text', defaultValue: '' },
          { key: 'videoUrl', label: 'Video URL (optional)', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Fallback image',
            accept: 'image/*',
            urlField: 'fallbackUrl',
            pathField: 'fallbackPath',
            folder: 'images',
          },
          {
            label: 'Video (optional)',
            accept: 'video/*',
            urlField: 'videoUrl',
            pathField: 'videoPath',
            folder: 'videos',
          },
        ],
        seedDefaults: defaultHeroSlides.map((s) => ({
          title: s.title,
          desc: s.desc,
          fallbackUrl: s.fallbackUrl,
          order: s.order,
        })),
      },
      {
        key: 'homeDestinations',
        label: 'Home Destinations',
        displayField: 'title',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'title', label: 'Title', type: 'text', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', defaultValue: '' },
          { key: 'imageUrl', label: 'Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Image',
            accept: 'image/*',
            urlField: 'imageUrl',
            pathField: 'imagePath',
            folder: 'images',
          },
        ],
        seedDefaults: defaultHomeDestinations.map((d) => ({
          title: d.title,
          description: d.description,
          imageUrl: d.imageUrl,
          order: d.order,
        })),
      },
      {
        key: 'homePackages',
        label: 'Home Packages',
        displayField: 'title',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'title', label: 'Title', type: 'text', defaultValue: '' },
          { key: 'summary', label: 'Summary', type: 'textarea', defaultValue: '' },
          { key: 'budget', label: 'Budget', type: 'text', defaultValue: '' },
          { key: 'points', label: 'Points (one per line)', type: 'lines', defaultValue: '' },
          { key: 'imageUrl', label: 'Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Image',
            accept: 'image/*',
            urlField: 'imageUrl',
            pathField: 'imagePath',
            folder: 'images',
          },
        ],
        seedDefaults: defaultHomePackages.map((p) => ({
          title: p.title,
          summary: p.summary,
          budget: p.budget,
          points: p.points,
          imageUrl: p.imageUrl,
          order: p.order,
        })),
      },
      {
        key: 'testimonials',
        label: 'Testimonials',
        displayField: 'name',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'name', label: 'Name', type: 'text', defaultValue: '' },
          { key: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: 5 },
          { key: 'text', label: 'Text', type: 'textarea', defaultValue: '' },
        ],
      },
      {
        key: 'packages',
        label: 'Tour Packages',
        displayField: 'title',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'title', label: 'Title', type: 'text', defaultValue: '' },
          { key: 'slug', label: 'Slug (URL)', type: 'text', defaultValue: '' },
          { key: 'category', label: 'Category', type: 'text', defaultValue: '' },
          { key: 'duration', label: 'Duration', type: 'text', defaultValue: '' },
          { key: 'customDuration', label: 'Custom Duration', type: 'text', defaultValue: '' },
          { key: 'location', label: 'Location', type: 'text', defaultValue: '' },
          { key: 'customLocation', label: 'Custom Location', type: 'text', defaultValue: '' },
          { key: 'price', label: 'Price (Numbers only)', type: 'number', defaultValue: 0 },
          { key: 'discountPrice', label: 'Discount Price', type: 'number', defaultValue: 0 },
          { key: 'overview', label: 'Overview', type: 'textarea', defaultValue: '' },
          { key: 'inclusions', label: 'Inclusions (one per line)', type: 'lines', defaultValue: '' },
          { key: 'exclusions', label: 'Exclusions (one per line)', type: 'lines', defaultValue: '' },
          { key: 'imageUrl', label: 'Main Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Main Image',
            accept: 'image/*',
            urlField: 'imageUrl',
            pathField: 'imagePath',
            folder: 'images',
          },
        ],
        seedDefaults: uttarakhandTourPackages.map((p, i) => ({
          ...p,
          order: i + 1,
        })),
      },
      {
        key: 'destinations',
        label: 'Destinations',
        displayField: 'title',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'title', label: 'Title', type: 'text', defaultValue: '' },
          { key: 'slug', label: 'Slug (URL)', type: 'text', defaultValue: '' },
          { key: 'tagline', label: 'Tagline', type: 'text', defaultValue: '' },
          { key: 'altitude', label: 'Altitude', type: 'text', defaultValue: '' },
          { key: 'bestTime', label: 'Best Time', type: 'text', defaultValue: '' },
          { key: 'idealDuration', label: 'Ideal Duration', type: 'text', defaultValue: '' },
          { key: 'overview', label: 'Overview', type: 'textarea', defaultValue: '' },
          { key: 'activities', label: 'Activities (one per line)', type: 'lines', defaultValue: '' },
          { key: 'highlights', label: 'Highlights (one per line)', type: 'lines', defaultValue: '' },
          { key: 'img', label: 'Main Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Main Image',
            accept: 'image/*',
            urlField: 'img',
            pathField: 'imgPath',
            folder: 'images',
          },
        ],
        seedDefaults: uttarakhandDestinations.map((d, i) => ({
          ...d,
          order: i + 1,
        })),
      },
      {
        key: 'gallery',
        label: 'Gallery',
        displayField: 'title',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'title', label: 'Title', type: 'text', defaultValue: '' },
          { key: 'category', label: 'Category', type: 'text', defaultValue: '' },
          { key: 'url', label: 'Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Image',
            accept: 'image/*',
            urlField: 'url',
            pathField: 'imagePath',
            folder: 'images',
          },
        ],
        seedDefaults: galleryItems.map((g, i) => ({
          ...g,
          order: i + 1,
        })),
      },
      {
        key: 'hotels',
        label: 'Hotels / Resorts',
        displayField: 'name',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'name', label: 'Name', type: 'text', defaultValue: '' },
          { key: 'location', label: 'Location', type: 'text', defaultValue: '' },
          { key: 'price', label: 'Price/Night', type: 'text', defaultValue: '' },
          { key: 'facilities', label: 'Facilities (one per line)', type: 'lines', defaultValue: '' },
          { key: 'imageUrl', label: 'Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Image',
            accept: 'image/*',
            urlField: 'imageUrl',
            pathField: 'imagePath',
            folder: 'images',
          },
        ],
        seedDefaults: defaultFlatHotels.map((h, i) => ({
          ...h,
          order: i + 1,
        })),
      },
      {
        key: 'about',
        label: 'About Page',
        displayField: 'sectionTitle',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'sectionTitle', label: 'Section Title', type: 'text', defaultValue: 'Core Values' },
          { key: 'content', label: 'Content', type: 'textarea', defaultValue: '' },
          { key: 'imageUrl', label: 'Image URL', type: 'text', defaultValue: '' },
        ],
        uploads: [
          {
            label: 'Image',
            accept: 'image/*',
            urlField: 'imageUrl',
            pathField: 'imagePath',
            folder: 'images',
          },
        ],
        seedDefaults: [
          {
            order: 1,
            sectionTitle: '🏔 About Us',
            content: 'We are a Uttarakhand-based travel and wedding management team dedicated to providing unforgettable experiences for travelers and couples. Our goal is to make your journey and celebrations in the beautiful hills of Uttarakhand smooth, memorable, and stress-free.\n\nWith strong local knowledge and professional planning, we offer safe, affordable, and luxury travel as well as destination wedding services tailored to your needs.',
            imageUrl: '',
          }
        ],
      },
      {
        key: 'contact',
        label: 'Contact Info',
        displayField: 'type',
        fields: [
          { key: 'order', label: 'Order', type: 'number', defaultValue: 1 },
          { key: 'type', label: 'Type (e.g. Email/Phone/Address)', type: 'text', defaultValue: '' },
          { key: 'value', label: 'Value', type: 'textarea', defaultValue: '' },
        ],
        seedDefaults: [
          { order: 1, type: 'Phone', value: '+91 98765 43210' },
          { order: 2, type: 'WhatsApp', value: '+91 98765 43210' },
          { order: 3, type: 'Email', value: 'info@example.com' },
          { order: 4, type: 'Address', value: 'Dehradun, Uttarakhand' },
        ],
      },
    ],
    []
  );

  const activeSchema = useMemo(
    () => schemas.find((s) => s.key === activeKey) || schemas[0],
    [activeKey, schemas]
  );

  useEffect(() => {
    document.title = 'Admin | Book our Uttarakhand';
  }, []);

  useEffect(() => {
    if (!firebaseEnabled || !auth) return undefined;

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthStatus('ready');
      setMessage('');

      if (!nextUser || !db) {
        setIsAdmin(false);
        setAdminDocExists(false);
        return;
      }

      const bootstrap = canBootstrap(nextUser.email);
      try {
        const snap = await getDoc(doc(db, 'admins', nextUser.uid));
        setAdminDocExists(snap.exists());
        setIsAdmin(bootstrap || snap.exists());
      } catch (err) {
        setIsAdmin(bootstrap);
        setAdminDocExists(false);
        setMessage(err?.message || 'Unable to check admin access.');
      }
    });

    return () => unsubscribe();
  }, []);

  const makeMeAdmin = async () => {
    if (!user || !db) return;
    if (!canBootstrap(user.email)) {
      setMessage('Not allowed: add your email to VITE_BOOTSTRAP_ADMIN_EMAILS in your rules bootstrap list.');
      return;
    }
    setMessage('');
    await setDoc(doc(db, 'admins', user.uid), { email: user.email, createdAt: serverTimestamp() }, { merge: true });
    setAdminDocExists(true);
    setIsAdmin(true);
    setMessage('Admin enabled for this user.');
  };

  const logout = async () => {
    setMessage('');
    await signOut(auth);
  };

  if (!firebaseEnabled) {
    return (
      <div className="admin-shell">
        <div className="admin-card">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-muted">
            Firebase is not configured. Add your Firebase config to <code>.env.local</code> and restart the dev server.
          </p>
          <p className="admin-muted">
            Required: <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_AUTH_DOMAIN</code>,{' '}
            <code>VITE_FIREBASE_PROJECT_ID</code>, <code>VITE_FIREBASE_APP_ID</code>.
          </p>
        </div>
      </div>
    );
  }

  if (authStatus === 'loading') {
    return (
      <div className="admin-shell">
        <div className="admin-card">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoggedIn={(u) => setUser(u)} />;
  }

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-title">Admin Panel</h1>
            <div className="admin-muted">
              Signed in as {user.email || user.uid} {isAdmin ? '• admin' : '• read-only'}
            </div>
          </div>
          <div className="admin-row">
            {!adminDocExists && canBootstrap(user.email) ? (
              <button className="admin-btn primary" type="button" onClick={makeMeAdmin}>
                Make me admin
              </button>
            ) : null}
            <button className="admin-btn" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>

        {message ? <p className="admin-muted">{message}</p> : null}

        <div className="admin-grid">
          <nav className="admin-nav" aria-label="Admin sections">
            {schemas.map((schema) => (
              <button
                key={schema.key}
                type="button"
                className={schema.key === activeKey ? 'active' : ''}
                onClick={() => setActiveKey(schema.key)}
              >
                {schema.label}
              </button>
            ))}
            <button
              type="button"
              className={activeKey === 'enquiries' ? 'active' : ''}
              onClick={() => setActiveKey('enquiries')}
            >
              Enquiries
            </button>
          </nav>

          <main className="admin-main">
            {activeKey === 'enquiries' ? (
              <EnquiriesPanel isAdmin={isAdmin} />
            ) : (
              <CollectionManager schema={activeSchema} isAdmin={isAdmin} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
