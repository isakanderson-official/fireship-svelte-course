<script lang="ts">
    import {auth} from '$lib/firebase';
    import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
    import {user} from '$lib/firebase';

  async function signInWithGoogle() {
   const provider = new GoogleAuthProvider();
   const credential = await signInWithPopup(auth, provider)

   const idToken = await credential.user.getIdToken();

   await fetch("/api/signin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({idToken})
   })
  }
  async function signOutSSR() {
  await fetch('/api/signin',{method: 'DELETE'});
  await signOut(auth);
  }
</script>

<h2>Login</h2>
<!-- svelte-ignore missing-declaration -->
{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}