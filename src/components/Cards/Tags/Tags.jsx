import Tag from "src/components/Tag/Tag";
import Stack from "react-bootstrap/Stack";

const Tags = ({ tags }) => {
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
  return (
    <Stack direction="horizontal" gap={2}>
      {tags.map((tag) =>
        <Tag key={tag.text} bg={tag.type} title={tag.text}/>
      )}
    </Stack>
  );
};

export default Tags;
