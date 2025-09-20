<script>
  import { fly, scale } from 'svelte/transition';
  import { registerUser, loginUser } from '../api/auth'; 
  import { token, user } from '../stores/auth';
  import { get } from 'svelte/store';

  let activeForm = null; // 'login' | 'register' | 'dashboard' | null
  let error = '';
  let loading = false;

  // Login form
  let loginEmail = '';
  let loginPassword = '';

  // Register form
  let regName = '';
  let regEmail = '';
  let regPassword = '';

  async function handleLogin() {
    loading = true;
    error = '';
    try {
      const res = await loginUser({ email: loginEmail, password: loginPassword });
      token.set(res.tokens.accessToken);
      user.set({ name: res.name });
      activeForm = 'dashboard';
    } catch (e) {
      error = e.errors?.[0] || 'Erro ao logar';
    } finally {
      loading = false;
    }
  }

  async function handleRegister() {
    loading = true;
    error = '';
    try {
      const res = await registerUser({ name: regName, email: regEmail, password: regPassword });
      token.set(res.tokens.accessToken);
      user.set({ name: res.name });
      activeForm = 'dashboard';
    } catch (e) {
      error = e.errors?.[0] || 'Erro ao cadastrar';
    } finally {
      loading = false;
    }
  }

  function logout() {
    token.set('');
    user.set(null);
    activeForm = null;
    // limpa campos
    loginEmail = '';
    loginPassword = '';
    regEmail = '';
    regPassword = '';
    regName = '';
  }
</script>

<style>
  .panel-shadow {
    box-shadow: 0 10px 30px rgb(0 0 0 / 0.1);
  }
</style>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-purple-300 relative overflow-hidden">
  <div class="flex w-full max-w-6xl h-[520px] rounded-3xl shadow-lg bg-gradient-to-br from-indigo-600 to-purple-700 overflow-hidden relative">

    <!-- Painel de Login -->
    <div class="bg-white w-0 md:w-1/2 transition-all duration-500 ease-in-out overflow-hidden panel-shadow"
         style="width: {activeForm === 'login' ? '50%' : '0'}">
      {#if activeForm === 'login'}
      <div class="p-12 flex flex-col justify-center h-full">
        <h2 class="text-4xl text-center font-stretch-extra-condensed text-gray-900 mb-6">Entrar</h2>        
        {#if error}
          <p class="text-red-500 mb-4">{error}</p>
        {/if}
        <label class="block mb-2 text-gray-700 font-semibold" for="login-email">Email</label>
        <input
          id="login-email"
          class="text-gray-800 w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          bind:value={loginEmail}
          placeholder="Digite seu email"
        />

        <label class="block mb-2 text-gray-700 font-semibold" for="login-password">Senha</label>
        <input
          id="login-password"
          class="text-gray-800 w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          bind:value={loginPassword}
          placeholder="Digite sua senha"
        />

        <button
          on:click={handleLogin}
          class="btn btn-outline btn-primary px-8 text-lg"
        >
          Entrar
        </button>
      </div>
      {/if}
    </div>

    <!-- Painel de Cadastro -->
    <div class="bg-white w-0 md:w-1/2 transition-all duration-500 ease-in-out overflow-hidden panel-shadow"
         style="width: {activeForm === 'register' ? '50%' : '0'}">
      {#if activeForm === 'register'}
      <div class="p-12 flex flex-col justify-center h-full">
        <h2 class="text-4xl text-center font-stretch-extra-condensed text-gray-900 mb-6">Cadastre-se</h2>        
        {#if error}
          <p class="text-red-500 mb-4">{error}</p>
        {/if}
        <label class="block mb-2 text-gray-700 font-semibold" for="reg-name">Nome</label>
        <input
          id="reg-name"
          class="text-gray-800 w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          bind:value={regName}
          placeholder="Digite seu nome"
        />

        <label class="block mb-2 text-gray-700 font-semibold" for="reg-email">Email</label>
        <input
          id="reg-email"
          class="text-gray-800 w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          bind:value={regEmail}
          placeholder="Digite seu email"
        />

        <label class="block mb-2 text-gray-700 font-semibold" for="reg-password">Senha</label>
        <input
          id="reg-password"
          class="text-gray-800 w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          bind:value={regPassword}
          placeholder="Digite sua senha"
        />

        <button
          on:click={handleRegister}
          class="btn btn-outline btn-secondary px-8 text-lg"
        >
          Cadastrar
        </button>
      </div>
      {/if}
    </div>

    <!-- Painel Principal -->
    <div class="flex-1 bg-gradient-to-br from-indigo-700 to-purple-800 relative flex flex-col items-center justify-center p-12 text-white">
      {#if activeForm === 'dashboard' && $user}
        <h1 class="text-4xl font-extrabold mb-6 text-center">Bem-vindo, {$user.name} 👋</h1>
        <p class="mb-8 text-center">Você está logado. Aproveite para gerenciar suas receitas favoritas!</p>
        <button
          on:click={logout}
          class="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Sair
        </button>
      {:else}
        <h1 class="text-4xl font-extrabold mb-4 text-center">Bem-vindo ao <span class="text-pink-500">MyRecipeBook</span>!</h1>
        <p class="mb-12 max-w-md text-center">Gerencie suas receitas favoritas de forma simples, rápida e deliciosa! 🍲</p>
        <div class="space-x-6">
          <button
            on:click={() => activeForm = activeForm === 'login' ? null : 'login'}
            class="btn btn-primary px-8 text-lg"
          >
            Entrar
          </button>
          <button
            on:click={() => activeForm = activeForm === 'register' ? null : 'register'}
            class="btn btn-outline btn-secondary px-8 text-lg"
          >
            Cadastrar
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
