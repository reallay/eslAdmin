<template>
  <div class="app-container">
    <div class="filter-container">
<!--      <el-input v-model="listQuery.pay_money" placeholder="Pay Money" type="number" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
<!--      <el-select v-model="listQuery.status" placeholder="Status" clearable style="width: 90px" class="filter-item">-->
<!--        <el-option v-for="item in statusOptions" :key="item.label" :label="item.label" :value="item.value" />-->
<!--      </el-select>-->
<!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
<!--        Search-->
<!--      </el-button>-->
<!--      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
<!--        Export-->
<!--      </el-button>-->
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Location Category">
              <span> {{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="Company Name (EN)">
              <span> {{ props.row.user_info.vendor_name_en }}</span>
            </el-form-item>
            <el-form-item label="Legal Company Name">
              <span> {{ props.row.user_info.legal_company_name }}</span>
            </el-form-item>
            <el-form-item label="Vendor Type Name">
              <span> {{ props.row.user_info.vendor_type_name }}</span>
            </el-form-item>
            <el-form-item label="Work Email">
              <span> {{ props.row.user_info.work_email }}</span>
            </el-form-item>
            <el-form-item label="Wechat Id">
              <span> {{ props.row.user_info.wx_id}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="User Id" prop="user_id" >
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="First&&Last Name" width="110">
        <template slot-scope="{row}" v-if="row.user_info">
          {{ row.user_info.first_name }} {{row.user_info.last_name}}
        </template>
      </el-table-column>
      <el-table-column label="Deal/Discount Name" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.desc">{{ row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Deal/Discount Desc" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.desc">{{ row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Participating Locations" width="150px" align="center">
        <template slot-scope="{row}">
          <a :href="row.file">{{row.file_name}}</a>
<!--          <span v-if="row.file">{{ row.file}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="City" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.location">{{ row.location}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Multiple Locations or 1" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.is_all==1">All Locations</span>
          <span v-if="row.is_all==0">Limited</span>
        </template>
      </el-table-column>
      <el-table-column label="Deal/Discount" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.type==1">Deal</span>
          <span v-if="row.type==2">Discount</span>
        </template>
      </el-table-column>
      <el-table-column label="Deal/Discount Duration" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.due_contract == 1">1 year</span>
          <span v-if="row.due_contract == 2">2 year</span>
        </template>
      </el-table-column>
      <el-table-column label="Dog Friendly" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.allowed_dog == 1">Yes</span>
          <span v-if="row.allowed_dog == 0">Unknown</span>
        </template>
      </el-table-column>

      <el-table-column label="Reason" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.status === 0" :type="row.status | statusFilter">
            Pending
          </el-tag>
          <el-tag v-if="row.status === 1" :type="row.status | statusFilter">
            Passed
          </el-tag>
          <el-tag v-if="row.status === 2" :type="row.status | statusFilter">
            Refuse
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleReview(row)">
            Review
          </el-button>
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            Edit
          </el-button>
<!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
<!--            Publish-->
<!--          </el-button>-->
<!--          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
<!--            Draft-->
<!--          </el-button>-->
<!--          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">-->
<!--            Delete-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
<!--    deals-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormDealsVisible">
      <el-form ref="dataForm"  :model="dealsTempData" label-position="left" label-width="140px" style="width: 540px; margin-left:50px;">
        <el-form-item label="Deal or Discount">
          <el-select v-model="dealsTempData.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Deal/Discount Name">
          <el-input v-model="dealsTempData.title" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Deal/Discount desc">
          <el-input v-model="dealsTempData.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Multiple Locations or 1">
          <el-select v-model="dealsTempData.is_all" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsTwo" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Location Category">
          <el-select v-model="dealsTempData.city" class="filter-item" placeholder="Please select">
            <el-option v-for="item in popuCityList" :key="item.id" :label="item.object_en" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="City">
          <el-input  v-model="dealsTempData.location" class="filter-item"  placeholder="Please select"></el-input>
        </el-form-item>
        <el-form-item label="Deal/Discount Duration">
          <el-select v-model="dealsTempData.due_contract" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsThree" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Dog Friendly">
          <el-select v-model="dealsTempData.allowed_dog" class="filter-item" placeholder="Please select">
            <el-option v-for="item in allowedDogOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
        <el-button @click="dialogFormDealsVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="editData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.reason" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="reviewData">
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
import { dealsList,approveDeal,addDeals } from '@/api/deals'
import {userList,userObjectList} from '@/api/member'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      uploadRequestUrl:process.env.VUE_APP_UPLOAD_API,
      dealsType:[{label:'Deal',value:1},{label:'Discount',value:2}],
      dealsTwo:[{label:'All Locations',value:1},{label:'Limited',value:0}],
      dealsThree:[{label:'1 year',value:1},{label:'2 year',value:2}],
      dealsFour:[{label:'Shanghai',value:1},{label:'Other',value:0}],
      allowedDogOptions:[{label:"Yes",value:1},{label: "No",value: 0}],
      userListData:[],
      popuCityList:[],

      dealsTempData:{
        user_id:1,
        type:undefined,
        is_all:undefined,
        file:undefined,
        due_contract:undefined,
        pay_money:undefined,
        title:undefined,
        desc:undefined,
        deal_id:undefined,
        city:undefined,
        location:undefined,
        identity:undefined,
        file_name:undefined,
        allowed_dog:undefined,

      },
      fileUrl:undefined,
      fileList:undefined,

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        pay_money: undefined,
        status: undefined
      },
      statusOptions: [{label:'passed',value:1},{label:'refuse',value:2}],
      temp: {
        deal_id: undefined,
        reason: '',
        status: undefined
      },
      dialogFormVisible: false,
      dialogFormDealsVisible:false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'status is required', trigger: 'change' }],
      },
      downloadLoading: false,
      fileName:undefined


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
    // this.getUserList()
    this.getUserObjList()
  },
  methods: {
    getUserList(){
      userList().then(res=>{
        console.log(res)
        // this.userListData = res.message
      })
    },
    getUserObjList(){
      userObjectList({pid:71}).then(res=>{
          this.popuCityList = res.message
      })
    },
    uploadFileSuccess(response,file,fileList){
      console.log(response)
      console.log(file)
      console.log(fileList)
      if (response.code == 200){
        this.dealsTempData.file = response.data[0].file_url
        this.dealsTempData.file_name = file.name

      }else{
        console.log(response.msg)
      }
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      dealsList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.message.data
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleEdit(row){

      this.dealsTempData = Object.assign({}, row) // copy obj
      this.dealsTempData.deal_id = row.id
      this.dialogStatus = 'update'
      this.dialogFormDealsVisible=true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dealsTempData)

          addDeals(tempData).then(() => {
            this.getList()
            this.dialogFormDealsVisible=false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleReview(row) {
      // this.temp = Object.assign({}, row)
      this.temp.deal_id = row.id
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    reviewData(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          const tempData = Object.assign({}, this.temp)

          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          approveDeal(tempData).then((res) => {
            // console.log(res)
            if (res.code == 200){
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)

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
      this.list.splice(index, 1)
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
    }
  }
}
</script>
