import { describe, it, vi, expect } from 'vitest';
import edit from '../../users/helpers/edit';

describe('editUser', () => {
  it('debería llamar a la función edit con los parámetros correctos', async () => {
    const userId = 10;
    const userData = {
      username: 'daniray6',
      password: '1234567',
    };

    const responseMuck = await edit(userId, userData);
    const data = responseMuck[0]
    expect(data.username).toBe(userData.username);
    expect(data.password).toBe(userData.password);
  });
});
