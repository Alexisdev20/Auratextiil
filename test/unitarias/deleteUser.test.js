import { describe, it, vi, expect } from 'vitest';
import deleteUser from '../../users/helpers/delete';

describe('delete user', async () => {
  it('debería de eliminar el usuario con el id correcto', async () => {
    const userId = 19;

    const responseMuck = await deleteUser(userId);
    const data = responseMuck[0]
    expect(data.id).toBe(userId);
  });
});