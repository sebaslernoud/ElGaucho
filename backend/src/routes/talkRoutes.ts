import { Router } from 'express';
import {
  getAllTalks,
  getTalkById,
  createTalk,
  updateTalk,
  deleteTalk,
} from '../controllers/talkController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';


const router = Router();

router.get('/', getAllTalks);
router.get('/:id', getTalkById);
router.post('/', authenticateToken, authorizeRoles(['admin']), createTalk);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), updateTalk);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteTalk);

export default router;