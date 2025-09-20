import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Use valores seguros caso esteja rodando no servidor
export const token = writable(browser ? localStorage.getItem('token') || '' : '');
export const user = writable(browser ? JSON.parse(localStorage.getItem('user')) || null : null);

// Atualiza o localStorage só no browser
if (browser) {
  token.subscribe((value) => {
    if (value) localStorage.setItem('token', value);
    else localStorage.removeItem('token');
  });

  user.subscribe((value) => {
    if (value) localStorage.setItem('user', JSON.stringify(value));
    else localStorage.removeItem('user');
  });
}
