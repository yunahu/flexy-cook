import Badge from 'react-bootstrap/Badge';

const Tag = ({ title, bg = "primary" }) => {
  return (
    <Badge pill bg={bg}>
      {title}
    </Badge>
  );
};

export default Tag;
