import { CATEGORY_META } from '../utils/constants';

const CategoryBadge = ({ category }) => {
  const meta = CATEGORY_META[category] || CATEGORY_META.Other;

  return (
    <span
      className="badge"
      style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
    >
      <span className="mr-1">{meta.icon}</span>
      {category}
    </span>
  );
};

export default CategoryBadge;
