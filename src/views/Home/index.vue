<template>
    <div class="hello">
        <el-button type="primary" @click="handleAdd">添加</el-button>

        <el-table
                :data="tableDate"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="姓名"
                    align="center"
                    >
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="日期"
                    align="center"
                    >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="handleDel(scope.$index, scope.row)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import requestURL from '@/api/api'

    export default {
        name: 'Home',
        data() {
            return {
                tableDate: []
            }
        },
        mounted() {
            this.initTableData()
        },
        methods: {
            // 初始化数据
            initTableData() {
                let that = this
                requestURL.toGetUsers().then(res => {
                    that.tableDate = res.data
                })
            },
            // 删除行
            handleDel(index, rows) {
                console.log(index)
                let that = this

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    requestURL.toDelUserById(rows.id).then(res => {
                        console.log(res)
                        that.$message({
                            type: 'success',
                            message: res.message
                        })
                        that.initTableData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

            handleAdd() {
                let that = this
                let params = {
                    name: '你好',
                    age: 18,
                }
                requestURL.toAddUser(params).then(res => {
                    console.log(res)
                    console.log("添加成功")
                    that.initTableData()
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
