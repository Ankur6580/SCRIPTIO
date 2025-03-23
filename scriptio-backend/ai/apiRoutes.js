const { generateScript, getAllScripts, saveScript, deleteScript, generateScriptPDF } = require('./aiController');

const router = require('express').Router();

router.post('/generate', generateScript);
router.post('/savescript', saveScript);
router.post('/generatepdf', generateScriptPDF);

router.get('/scripts/:userID', getAllScripts);
router.delete('/deletescript/:scriptID', deleteScript);

module.exports = router;