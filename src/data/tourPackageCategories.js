export const tourPackageCategories = [
  {
    slug: 'all',
    label: 'All',
    navLabel: 'All Packages',
    category: 'All',
  },
  {
    slug: 'spiritual',
    label: 'Spiritual',
    navLabel: 'Uttarakhand Spiritual Packages',
    category: 'Char Dham & Spiritual Tours',
  },
  {
    slug: 'hill-stations',
    label: 'Hill Stations',
    navLabel: 'Uttarakhand Hill Station Packages',
    category: 'Hill Station & Family Tours',
  },
  {
    slug: 'adventure',
    label: 'Adventure & Wildlife',
    navLabel: 'Uttarakhand Adventure Packages',
    category: 'Wildlife & Adventure',
  },
  {
    slug: 'seasonal',
    label: 'Seasonal',
    navLabel: 'Uttarakhand Seasonal Packages',
    category: 'Seasonal Packages',
  },
];

export function categoryFromSlug(slug) {
  const key = String(slug || '').toLowerCase();
  const hit = tourPackageCategories.find((c) => c.slug === key);
  return hit?.category || 'All';
}

export function slugFromCategory(category) {
  const hit = tourPackageCategories.find((c) => c.category === category);
  return hit?.slug || 'all';
}

