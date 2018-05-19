<section class="content-section-b make-list">
    <div class="container">
        <div class="row">
            <h3 class="widget-title style2">Find your Part by Make</h3>
        </div>

    </div>
</section>
<section class="content-section-a">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                {{#each facetsList}}
                    <h2 class="">{{id}}</h2>
                    {{#if values}}
                        <div class="row list-group">
                            {{#each values}}
                                <div class="col-lg-3 col-md-3 col-sm-4 pad-v pad-less">
                                    <a href="/{{parentId}}/{{url}}">
                                        {{translate label}}
                                        <span class="qty-products pull-right">
                                            <span class="fill-me text-sm subtle-more"></span>
                                        </span>
                                        <span class="clearfix"></span>
                                    </a>
                                </div>
                            {{/each}}
                        </div>
                    {{/if}}
                {{/each}}
            </div>
        </div>
    </div>
</section>