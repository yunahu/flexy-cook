import Badge from 'react-bootstrap/Badge';

const Tag = ({ title, bg = "primary", className = "class"}) => {
  return (
    <Badge pill bg={bg} className={className}> 
      {title}
    </Badge>
  );
};


export default Tag;
