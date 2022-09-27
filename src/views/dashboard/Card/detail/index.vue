<template >
    <div>
        <div class="card-header">
            <span>{{title}}</span>
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 class="w-6 h-6"
                 style="width: 17px;">
                <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>

        </div>
        <div class="card-content">
            {{count}}
        </div>
        <div class="card-charts">
            <slot name="charts">

            </slot>
        </div>
        <div class="card-footer">
            <slot name="footer">

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardDetail',
    props: ['title', 'count']

}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}

.card-content {
    font-size: 30px;
    padding: 10px 0;
}

.card-charts {
    height: 50px;
    position: relative;

}

.card-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
}

div>>>svg {
    width: 16px;
    height: 16px;
}
</style>
