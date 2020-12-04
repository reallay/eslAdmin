<template>
  <div class="app-container">

    <el-tabs @tab-click="tabClickJobs" value="All"  style="margin-top:15px;" type="border-card">
      <el-tab-pane  v-for="item in adsTypeOptions2" :key="item.value" :label="item.label" :name="item.label">
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
                  <el-form-item label="File" style="color: #20a0ff;">
                    <span><a :href="props.row.file">{{ props.row.file }}</a></span>
                  </el-form-item>

                  <el-form-item label="Desc" style="word-break: break-all;">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                  <el-form-item label="Education">
                    <span>{{ props.row.education }}</span>
                  </el-form-item>
                  <el-form-item label="Employment_type">
                    <span v-if="props.row.employment_type == 1">FT</span>
                    <span v-if="props.row.employment_type == 2">PT</span>
                    <span v-if="props.row.employment_type == 3">S</span>
                  </el-form-item>
                  <el-form-item label="Entry Date">
                    <span>{{ props.row.entry_date }}</span>
                  </el-form-item>
                  <el-form-item label="Interview image" v-if="props.row.interview_imgurl !=''">
                    <el-image style="width: 100px;height: 100px;" :src="props.row.interview_imgurl"  :preview-src-list="[props.row.interview_imgurl]"></el-image>
                  </el-form-item>
                  <el-form-item label="Interview Name">
                    <span>{{ props.row.interview_name }}</span>
                  </el-form-item>
                  <el-form-item label="Interview Nationality">
                    <span>{{ props.row.interview_nationality }}</span>
                  </el-form-item>
                  <el-form-item label="Is Cpr">
                    <span v-if="props.row.is_cpr == 1">Yes</span>
                    <span v-if="props.row.is_cpr == 0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Equal">
                    <span v-if="props.row.is_equal==1">Yes</span>
                    <span v-if="props.row.is_equal==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is First Aide">
                    <span v-if="props.row.is_first_aide==1">Yes</span>
                    <span v-if="props.row.is_first_aide==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Interview">
                    <span v-if="props.row.is_interview==1">Yes</span>
                    <span v-if="props.row.is_interview==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Native">
                    <span v-if="props.row.is_native==1">Yes</span>
                    <span v-if="props.row.is_native==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Online">
                    <span v-if="props.row.is_online==1">Yes</span>
                    <span v-if="props.row.is_online==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Open">
                    <span v-if="props.row.is_open==1">Yes</span>
                    <span v-if="props.row.is_open==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Paid">
                    <span v-if="props.row.is_paid==1">Yes</span>
                    <span v-if="props.row.is_paid==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Teaching Exp">
                    <span v-if="props.row.is_teaching_exp==1">Yes</span>
                    <span v-if="props.row.is_teaching_exp==0">No</span>
                  </el-form-item>
                  <el-form-item label="Is Teaching License">
                    <span v-if="props.row.is_teaching_license==1">Yes</span>
                    <span v-if="props.row.is_teaching_license==0">No</span>
                  </el-form-item>

                  <el-form-item label="Language">
                    <span>{{ props.row.language }}</span>
                  </el-form-item>
                  <el-form-item label="nationality">
                    <span>{{ props.row.nationality }}</span>
                  </el-form-item>
                  <el-form-item label="Numbers">
                    <span>{{ props.row.numbers }}</span>
                  </el-form-item>
                  <el-form-item label="Payment Period">
                    <span>{{ props.row.payment_period }}</span>
                  </el-form-item>

                  <el-form-item label="Gender">
                    <span v-if="props.row.sex == 1">Male</span>
                    <span v-if="props.row.sex == 2">Female</span>
                    <span v-if="props.row.sex == 3">Both</span>
                  </el-form-item>
                  <el-form-item label="Teaching Times">
                    <span>{{ props.row.teaching_times }}</span>
                  </el-form-item>

                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80"
                             :class-name="getSortClass('id')">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Job Title" width="150px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.job_title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Location" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.job_location }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Age" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.age }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Due Date" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.apply_due_date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Business Name" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.business_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Currency" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.currency }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Employment Type" width="110px" align="center">
              <template slot-scope="{row}">
                <span v-if="">{{ row.employment_type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Salary" width="110px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.salary_min }} - {{row.salary_max}}</span>
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
            <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary" size="mini" @click="handleAds(row)">
                  Ads
                </el-button>
                <el-button type="primary" size="mini" @click="handleReview(row)">
                  Review
                </el-button>
                <!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
                <!--            Publish-->
                <!--          </el-button>-->
                <el-button v-if="row.is_delete===1" size="mini" @click="handleRecover(row)">
                  Recover
                </el-button>
                <el-button v-if="row.is_delete===0" size="mini" type="danger" @click="handleDelete(row,$index)">
                  Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                      @pagination="getList"/>

      </el-tab-pane>
    </el-tabs>




    <el-dialog title="Review" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Reason">
          <el-input v-model="temp.reason" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"
                    placeholder="Please input"/>
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

    <el-dialog title="Ads" :visible.sync="dialogAdsFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="Type">
          <el-select v-model="adsTemp.ad_type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in adsTypeOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Sort">
          <el-input v-model="adsTemp.sort" type="number" placeholder="Please input"></el-input>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker @change="adsDueDateChange" v-model="adsTemp.ad_due_time" type="datetime" placeholder="Please pick a date" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdsFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="reviewAds">
          Confirm
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { jobList, approveJobs, delJobs,setJobFeature } from '@/api/jobs'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { format } from  'date-fns'

export default {
  name: 'ComplexTable',
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
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        ad_type:undefined
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: [{ label: 'pending', value: 0 }, { label: 'passed', value: 1 }, { label: 'refuse', value: 2 }],
      showReviewer: false,
      temp: {
        job_id: undefined,
        status: undefined,
        reason: ''
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogAdsFormVisible:false,
      adsTypeOptions:[{label:'Homepage',value:1},{label:'Jobs',value: 2}],
      adsTypeOptions2:[{label:'All',value: 0},{label:'Homepage',value:1},{label:'Jobs',value: 2}],
      adsTemp:{
        job_id:undefined,
        sort:undefined,
        ad_type:undefined,
        ad_due_time:undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tabClickJobs(e){
      console.log(e)
      if(e.index == 0){
        this.listQuery.ad_type=undefined
        this.getList()
      }
      if(e.index == 1){
        this.listQuery.ad_type = 1
        this.getList()
      }
      if(e.index == 2){
        this.listQuery.ad_type = 2
        this.getList()
      }

    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      jobList(this.listQuery).then(response => {
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
    handleDelete(row, index) {
      this.$confirm('This operation will delete the Job, do you want to continue?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        delJobs({ job_id: row.id, is_delete: 1 }).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: 'Delete Success!'
            });
            this.getList()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undeleted'
        });
      });

    },
    handleRecover(row) {
      delJobs({ job_id: row.id, is_delete: 0 }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    handleAds(row){
       this.dialogAdsFormVisible=true
      this.adsTemp.job_id = row.id

    },
    adsDueDateChange(e){
      console.log(format(e,'yyyy-MM-dd HH:mm:ss'))
      this.adsTemp.ad_due_time = format(e,'yyyy-MM-dd HH:mm:ss')
    },
    reviewAds(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.adsTemp)

          setJobFeature(tempData).then((res) => {
            console.log(res)
            this.dialogAdsFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleReview(row) {
      // this.temp = Object.assign({}, row) // copy obj
      this.temp.job_id = row.id
      // this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    reviewData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          approveJobs(tempData).then(() => {

            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
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
    }
  }
}
</script>
