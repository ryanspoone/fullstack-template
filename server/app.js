import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.set('port', 1050);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

const indexRouter = express.Router();
indexRouter.get('/', (req, res) => {
    res.send('FullStack Template');
});

// A fake API token our server validates
export const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';

const extractToken = req => req.query.token;

const authenticatedRoute = (req, res, next) => {
    const token = extractToken(req);

    if (token) {
        if (token === API_TOKEN) {
            return next();
        } else {
            return res.status(403).json({
                success: false,
                error: 'Invalid token provided'
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            error: 'No token provided. Supply token as query param `token`'
        });
    }
};

indexRouter.get('/check_token', (req, res) => {
    const token = extractToken(req);

    if (token) {
        if (token === API_TOKEN) {
            return res.json({ valid: true });
        } else {
            return res.json({ valid: false });
        }
    } else {
        return res.status(400).json({
            valid: false,
            error: 'No token found in `Authorization` header'
        });
    }
});

// Make things more noticeable in the UI by introducing a fake delay
// to logins
const FAKE_DELAY = 500; // ms
indexRouter.post('/login', (req, res) => {
    setTimeout(
        () =>
            res.json({
                success: true,
                token: API_TOKEN
            }),
        FAKE_DELAY
    );
});

import unprotectedRoutes from './routes/unprotected';
import protectedRoutes from './routes/protected';

indexRouter.use('/unprotected', unprotectedRoutes);
indexRouter.use('/protected', authenticatedRoute, protectedRoutes);

app.use(process.env.SERVER_ROUTE, indexRouter);

export default app;
