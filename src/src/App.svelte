<script>
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";
    export let icons;
    new ClipboardJS(".card");
    let search = "";
    const options = {};
    icons = icons.icons;

    function createToast() {
        toast.pop()
        toast.push("Badge Copied!", {
            theme: {
                "--toastBackground": "#48BB78",
                "--toastProgressBackground": "#2F855A",
            },
            // dismissable: false,
            duration: 3000,
            // intro: { x: 100 }
        });
    }

    $: list = icons
        ? icons.filter(
              (item) =>
                  item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
        : [];
</script>

<main>
    <div class="container">
        <div class="row">
            <div class="mt-4 mb-4">
                <input
                    type="text"
                    bind:value={search}
                    class="form-control search"
                    id="search"
                    placeholder="Search by name"
                />
            </div>
        </div>

        <div class="row row-cols-auto justify-content-center">
            {#each list as icon}
                <div class="col mb-3">
                    <div
                        class="card h-100"
                        style="background-color: #{icon.hex};"
                        data-clipboard-text={icon.src}
                        on:click={() => createToast()}
                    >
                        <div
                            class="img-badge"
                            style="color:{icon.color}; fill:{icon.color}"
                        >
                            <!-- <img
                                loading="lazy"
                                src={icon.src}
                                class="card-img-top"
                                alt={icon.name}
                            /> -->
                            <div style="font: bold 10px Verdana;">
                                {@html icon.svg}
                                <span>{icon.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>
<SvelteToast {options} />

<style>
</style>
