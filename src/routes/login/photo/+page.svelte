<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { storage, userData, user, db } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

    let previewUrl = "";
    let uploading = false;
    $: href = `/${userData?.username}/edit`;
    async function upload(e:any){
        uploading = true;
        const file = e.target.files[0];
        previewUrl = URL.createObjectURL(file);
        const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
        uploading = false;
    }
</script>

<AuthCheck>
    <h2 class="card-title">Upload a Profile Image</h2>
    <form class="max-w-screen-md w-full">
        <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
            <img src={previewUrl ?? $userData.photoURL ?? "/user.png"}
            alt="photo url"
            width="256"
            height="256"/>
            <label for="photoURL" class="label"><span class="label-text">
                Pick a file
            </span></label>
            <input
            on:change={upload}
            name="photoURL"
            type="file"
            class="file-input file-intput-bordered w-full max-w-xs"
            accept="image/png, image/jpeg, image/gif, image/webp"/>
            {#if uploading}
                <p>Uploading...</p>
                <progress class="progress progress-info w-56 mt-6"/>
            {/if}
        </div>
    </form>
   <a {href} class="btn btn-primary"> Finish </a> 
</AuthCheck>