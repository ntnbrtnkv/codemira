import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

function CreateRoot() {
  const id = nanoid();

  return (
    <div>
        <Link to={`/${id}`}>Create room</Link>
    </div>
  )
}

export default CreateRoot
