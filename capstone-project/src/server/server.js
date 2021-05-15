const app = require('./index');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`API running on /${PORT}/api/v1 \nApp running on /${PORT}`));
