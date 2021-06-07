<script>
    export let icons;
    new ClipboardJS(".card");
    console.log(icons);
	console.log(Object.entries(icons).length);
</script>

<main>
    <div class="container">
        <div class="row">
            <div class="mt-3 mb-3">
                <input
                    type="email"
                    class="form-control search"
                    id="search"
                    placeholder="Search by name"
                />
            </div>
        </div>
		
        <div class="row row-cols-auto justify-content-center">
            {#each Object.entries(icons) as [name]}
                <div class="col mb-3">
                    <div
                        class="card h-100" style="background-color: #{icons[name].hex};"
                        data-clipboard-text={icons[name].src}
                    >
                        <div class="img-badge">
                            <img
                                src={icons[name].src}
                                class="card-img-top"
                                alt={name}
                            />
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
</style>
