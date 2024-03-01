import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';


const Tags = ({tags}) => {
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
      <Stack direction='horizontal' gap={2}>
            
            <Badge bg={tags[0].color}>{tags[0].text}</Badge>
            <Badge bg={tags[1].color}>{tags[1].text}</Badge>
            <Badge bg={tags[2].color}>{tags[2].text}</Badge>

      </Stack>
   );
};

export default Tags;