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
            <el-form-item label="Date">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="Start Time">
              <span>{{ props.row.start_time }}</span>
            </el-form-item>
            <el-form-item label="End Time">
              <span>{{ props.row.end_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Name" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Desc" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Deal/Discount For ESL Passport Members" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type_desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Location" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.location}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Flyer" width="150px" align="center">
        <template slot-scope="{row}">
          <a :href="row.file">{{row.file_name}}</a>
<!--          <span>{{ row.file}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="Event Type" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.is_all == 1">Social</span>
          <span v-if="row.is_all == 2">Professional</span>
        </template>
      </el-table-column>
      <el-table-column label="Reason" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Event Price" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pay_money }}</span>
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
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--    events-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormEventsVisible">
      <el-form ref="dataForm"  :model="eventsTempData" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Event Type">
          <el-select v-model="eventsTempData.is_all" class="filter-item" placeholder="Please select">
            <el-option v-for="item in eventsOne" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Name">
          <el-input  v-model="eventsTempData.name" class="filter-item"  placeholder="Please input"></el-input>
        </el-form-item>
        <el-form-item label="Deal/Discount For ESL Passport Members">
          <el-input v-model="eventsTempData.type_desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Event Description">
          <el-input v-model="eventsTempData.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>


        <el-form-item label="Event Price">
          <el-input type="number" v-model="eventsTempData.pay_money" class="filter-item"  placeholder="Please select"></el-input>
        </el-form-item>

        <el-form-item label="Location Category">
          <el-select v-model="eventsTempData.city" class="filter-item" placeholder="Please select">
            <el-option v-for="item in popuCityList" :key="item.id" :label="item.object_en" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Event Location">
          <el-input  v-model="eventsTempData.location" class="filter-item"  placeholder="Please select"></el-input>
        </el-form-item>

        <el-form-item label="Event Date" >
          <!--          <el-input v-model="temp.birthday" />-->
          <el-date-picker
            v-model="eventsTempData.date"
            type="date"
            placeholder="Please picker a date"
            @change="eventsTempDateChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Start Time & End Time">
          <el-time-select
            placeholder="Start Time"
            @change="eventStartTimeChange"
            v-model="eventsTempData.start_time"
            :picker-options="{
      start: '00:00',
      step: '00:01',
      end: '24:00'
    }">
          </el-time-select>
          <el-time-select
            @change="eventEndTimeChange"
            placeholder="End Time"
            v-model="eventsTempData.end_time"
            :picker-options="{
       start: '00:00',
      step: '00:01',
      end: '24:00',
      minTime: eventsTempData.start_time
    }">
          </el-time-select>
        </el-form-item>

        <el-form-item label="Event Flyer">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action=uploadRequestUrl
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadEventsFileSuccess"
            :file-list="eventsFileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEventsVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateData">
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
import { eventsList,approveEvent ,addEvent} from '@/api/events'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { userObjectList } from '@/api/member' // secondary package based on el-pagination
import { format } from  'date-fns'
export default {
  name: 'index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
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
  data() {
    return {
      uploadRequestUrl:process.env.VUE_APP_UPLOAD_API,
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
      statusOptions: [{label:'pending',value: 0},{label:'passed',value:1},{label:'refuse',value:2}],
      temp: {
        event_id: undefined,
        reason: '',
        status: undefined
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
        type: [{ required: true, message: 'status is required', trigger: 'change' }],
      },
      downloadLoading: false,
      eventsFileUrl:undefined,
      eventsFileList:undefined,
      dialogFormEventsVisible:false,
      eventsTempData:{
        user_id:1,
        name:undefined,
        desc:undefined,
        is_all:undefined,
        type_desc:undefined,
        pay_money:undefined,
        date:undefined,
        start_time:undefined,
        end_time:undefined,
        file:undefined,
        location:undefined,
        city:undefined,
        is_unregister: 0,
        file_name:undefined
      },
      eventStartTime:undefined,
      eventEndTime:undefined,
      eventsOne:[{label:'Social',value:1},{label:'Professional',value: 2}],
      popuCityList:[],

    }
  },
  created() {
    this.getList()
    this.getUserObjList()
  },
  methods: {
    getUserObjList(){
      userObjectList({pid:71}).then(res=>{
        console.log(res)
        this.popuCityList = res.message
      })
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      eventsList(this.listQuery).then(response => {
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
      console.log(row)
      this.eventsTempData = Object.assign({}, row) // copy obj
      this.eventsTempData.event_id = row.id
      this.dialogStatus = 'update'
      this.dialogFormEventsVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    eventsTempDateChange(e){
      // console.log(e)
      this.eventsTempData.date = format(e, 'yyyy-MM-dd')
    },
    eventStartTimeChange(e){
        console.log(e)
      this.eventStartTime = this.eventsTempData.date + ' ' + e + ':00'
    },
    eventEndTimeChange(e){
      console.log(e)
      this.eventEndTime = this.eventsTempData.date + ' ' + e + ':00'
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(this.eventStartTime!=undefined){
            this.eventsTempData.start_time = this.eventStartTime
          }
          if(this.eventEndTime!=undefined){
            this.eventsTempData.end_time = this.eventEndTime
          }
          const tempData = Object.assign({}, this.eventsTempData)
          // console.log(tempData)
          // return;
          addEvent(tempData).then(() => {
            this.getList()
            this.dialogFormEventsVisible = false
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
    uploadEventsFileSuccess(response,file,eventsFileList){
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200){
        this.eventsFileUrl = response.data[0].file_url
        this.eventsTempData.file = response.data[0].file_url
        this.eventsTempData.file_name = file.name
        let file_name = response.data[0].file_name

      }else{
        console.log(response.msg)
      }
    },
    handleReview(row) {
      // this.temp = Object.assign({}, row)
      this.temp.event_id = row.id
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
          approveEvent(tempData).then((res) => {
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
