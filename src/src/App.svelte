<script>
    export let icons;
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

            <!-- <div>
				{JSON.stringify(icons)}
			</div> -->
        </div>
        <div class="row row-cols-6">
            {#each Object.entries(icons) as [name]}
                <div class="col mb-3">
                    <div class="card h-100">
                        <div class="img-badge">
                            <img
                                src={icons[name].src}
                                class="card-img-top"
                                alt={name}
                            />
						</div>
                        <div class="card-body">
                            <p class="card-text text-center">{name}</p>
                            <!-- <a href="#" class="btn btn-primary stretched-link"
                            >Go somewhere</a
                        > -->
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
</style>
