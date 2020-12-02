<template>
  <div class="app-container">
    <div class="filter-container">
<!--      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
<!--      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">-->
<!--        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />-->
<!--      </el-select>-->
<!--      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">-->
<!--        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />-->
<!--      </el-select>-->
<!--      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
<!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
<!--      </el-select>-->
<!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
<!--        Search-->
<!--      </el-button>-->
<!--      <el-tag v-permission="['lei']">admin</el-tag>-->

      <el-button v-permission="['lei']"  class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>

<!--      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
<!--        Export-->
<!--      </el-button>-->
<!--      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">-->
<!--        reviewer-->
<!--      </el-checkbox>-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Category" width="110px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" v-if="row.cate==1">Index</span>
          <span class="link-type" v-if="row.cate==2">Jobs</span>
          <span class="link-type" v-if="row.cate==3">Educator</span>
          <span class="link-type" v-if="row.cate==4">Business</span>
          <span class="link-type" v-if="row.cate==5">Vendor</span>
          <span class="link-type" v-if="row.cate==6">Deal</span>
          <span class="link-type" v-if="row.cate==7">Discount</span>
          <span class="link-type" v-if="row.cate==8">Contact</span>
        </template>
      </el-table-column>
      <el-table-column label="Link" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.link }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Position" width="110px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.position == 1">Top</span>
          <span v-if="row.position == 2">Mid</span>
          <span v-if="row.position == 3">Bottom</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="Sort" width="110px" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.sort }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Title" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Url" width="110px" align="center">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src=" row.url "
            fit="contain"></el-image>
<!--          <span>{{ row.url }}</span>-->
        </template>
      </el-table-column>
<!--      <el-table-column label="Is Delete" class-name="status-col" width="100">-->
<!--        <template slot-scope="{row}">-->
<!--          <el-tag>-->
<!--            {{ row.is_delete }}-->
<!--          </el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
<!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
<!--            Publish-->
<!--          </el-button>-->
          <el-button v-permission="['lei']" v-if="row.is_delete===1" size="mini" @click="handleRecover(row)">
            Recover
          </el-button>
          <el-button v-permission="['lei']" v-if="row.is_delete===0" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Category" prop="cate">
          <el-select v-model="temp.cate" class="filter-item" placeholder="Please select">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Position" prop="position">
          <el-select v-model="temp.position" class="filter-item" placeholder="Please select">
            <el-option v-for="item in positionList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Link">
          <el-input v-model="temp.link" />
        </el-form-item>
        <el-form-item label="Sort">
          <el-input v-model="temp.sort" />
        </el-form-item>
        <el-form-item label="Url">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action=uploadRequestUrl
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadFileSuccess"
            :file-list="fileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
<!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {add,adList,adDetail } from '@/api/ads'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/permission'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'index',
  components: { Pagination },
  directives: { waves,permission },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      uploadRequestUrl:process.env.VUE_APP_UPLOAD_API,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      categoryList:[{label:'Index',value:1},{label:'Jobs',value:2},{label:'Educator',value: 3},{label:'Business',value: 4},{label:'Vendor',value: 5},{label:'Deals',value:6},{label:'Discount',value: 7},{label:'Contact',value: 8}],
      positionList:[{label:'Top',value:1},{label:'Mid',value: 2},{label:'Bottom',value: 3}],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        title: '',
        url:'',
        link:'',
        cate:undefined,
        position:undefined,
        sort:undefined,
        ad_id:undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        cate: [{ required: true, message: 'category is required', trigger: 'change' }],
        position: [{ required: true, message: 'position is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      // uploadHeaders:undefined,
      fileUrl:undefined,
      fileList:undefined
    }
  },
  computed:{
    token() {
      return this.$store.state.user.token
    },
    uploadHeaders(){
      return {
        token:this.$store.state.user.token
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      adList(this.listQuery).then(response => {
        console.log(response)
        // this.list = response.message.data
        this.list  = response.message.data.filter(item=>item.is_delete===0)
        this.total = response.message.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        url:'',
        link:'',
        cate:undefined,
        position:undefined,
        sort:undefined,
        ad_id:undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.fileList=undefined
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          this.temp.url=  this.fileUrl
          add(this.temp).then((res) => {
            console.log(res)
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            window.location.reload()
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.ad_id = row.id
      this.temp.position = Number(row.position)
      this.fileList =  [{name: '', url: row.url}]
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.url = this.fileUrl
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          add(tempData).then((res) => {
            console.log(res)
            if(res.code == 200){
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.fileUrl = ''
            }

          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      // this.list.splice(index, 1)
      add({is_delete:1,ad_id:row.id}).then(res=>{
        console.log(res)
        this.getList()
      }).catch(error=>{
        console.log(error)
      })
    },
    handleRecover(row){
      add({is_delete:0,ad_id:row.id}).then(res=>{
        console.log(res)
        this.getList()
      }).catch(error=>{
        console.log(error)
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    uploadFileSuccess(response,file,fileList){
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200){
        this.fileUrl = response.data[0].file_url
        let file_name = response.data[0].file_name

      }else{
        console.log(response.msg)
      }
    }
  }
}
</script>
