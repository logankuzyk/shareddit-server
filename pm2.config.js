module.exports = {
  apps: [
    {
      name: 'shareddit-server',
      script: 'node -r module-alias/register ./dist --env=production',
    },
  ],
};
