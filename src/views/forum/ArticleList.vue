<template>
    <div class="container-body article-list-body" :style="{width: proxy.GlobalInfo.bodyWidth + 'px'}">
        <div class="article-panel">
            <div class="top-tab">
                <div>热榜</div>
                <el-divider direction="vertical"></el-divider>
                <div>发布时间</div>
                <el-divider direction="vertical"></el-divider>
                <div>最新</div>
            </div>
            <div class="article-list">
                <template v-for="item in articleListInfo.list">
                    <ArticleListItem :data="item"></ArticleListItem>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ArticleListItem from "@/views/forum/ArticleListItem.vue"

    import { ref, getCurrentInstance, onMounted } from "vue"
    import { useRouter, useRoute } from 'vue-router'

    const { proxy } = getCurrentInstance()
    const router = useRouter
    const route = useRoute

    const articleListInfo = ref({})

    onMounted(() => {
        loadArticle()
    })

    const loadArticle = async () => {
        let result = await proxy.Request({
            url: 'forum/loadArticle',
            params: {
                boardId: 0
            }
        })
        if(!result) {
            return
        }
        articleListInfo.value = result.data
    }

</script>

<style lang="scss">
    .article-list-body {
        .sub-board {
            padding: 10px 0px 12px 0px;

            .board-item {
                background: #fff;
                border-radius: 15px;
                padding: 2px 10px;
                margin-right: 10px;
                color: #909090;
                cursor: pointer;
                font-size: 14px;

                a {
                    text-decoration: none;
                    color: #909090;
                }
            }

            .active {
                background: var(--link);

                a {
                    color: #fff;
                }
            }
        }

        .article-panel {
            background: #fff;

            .top-tab {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                font-size: 15px;
                border-bottom: 1px solid #ddd;

                .tab {
                    cursor: pointer;
                }

                .active {
                    color: var(--link);
                }
            }
        }
    }
</style>