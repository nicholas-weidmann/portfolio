export const projects = [
  {
    params: {
      project: 'test_client',
    },
    props: {
      name: 'Test Client',
      description: 'A test client for testing the API',
      text: 'This is a test client for testing the API',
      category_tags: ['Game Dev', 'Web Design'],
      technology_tags: ['Angular', 'API', 'OpenID Connect'],
    },
  },
  {
    params: {
      project: 'portfolio',
    },
    props: {
      name: 'Portfolio',
      description: 'My portfolio website',
      text: 'This is my portfolio website',
      category_tags: ['Web Design'],
      technology_tags: ['Astro', 'Tailwind CSS', 'View Transition', 'Open Graph'],
    },
  },
  {
    params: {
      project: 'room_manager',
    },
    props: {
      name: 'Room Manager',
      description: 'API for game backend',
      text: 'This is the API for the game backend',
      category_tags: ['Game Dev', 'Infra'],
      technology_tags: ['NestJS', 'Lambda', 'DynamoDB', 'REST', 'OpenAPI'],
    },
  },
]
