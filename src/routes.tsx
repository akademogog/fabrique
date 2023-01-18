export default [
  { name: 'projects', path: '/projects/:projectId', children: [
    { name: 'actor', path: '/actor/:actorId'},
  ]}
]
