import Tag from "src/components/Tag/Tag";
import Stack from "react-bootstrap/Stack";
import { getTagInfo } from "src/utils/spoonacularFunctions";
import { useNavigate } from "react-router-dom";

const Tags = ({ className, tags = [] }) => {
  /**
      tags [
         index 0: {
            text: 'Tag 1',
            type: 'primary'
         },
         index 1: {
            text: 'Tag 2',
            type: 'success'
         },
         index 2: {
            text: 'Tag 3',
            type: 'warning'
         }
      ]
   */
  const navigate = useNavigate();
  const handleOnClick = (event, tag) => {
    event.stopPropagation();
    if (getTagInfo(tag) != null) {
      if (location.pathname == "/testSearch") {
        location.reload();
      }
      navigate("/testSearch", { state: { tagInfo: getTagInfo(tag) } });
    }
  };

  return (
    <Stack direction="horizontal" gap={2} className={className}>
      {tags.map((tag, index) => (
        <Tag
          testid={index}
          key={tag.text + index}
          bg={tag.type}
          title={tag.text}
          onClick={(event) => handleOnClick(event, tag)}
        />
      ))}
    </Stack>
  );
};

export default Tags;
