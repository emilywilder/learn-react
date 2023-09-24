export default function StoryTray({ stories }) {
    const createStory = {
      id: 'create',
      label: 'Create Story'
    }
  
    return (
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            {story.label}
          </li>
        ))}
        <li key={createStory.id}>
          {createStory.label}
        </li>
      </ul>
    )
  }
  