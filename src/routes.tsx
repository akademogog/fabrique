export default [
  { name: 'projects', path: '/projects/:piplineID', children: [
    { name: 'actor', path: '/actor/:actorID'},
  ]}
]
