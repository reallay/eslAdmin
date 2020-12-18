<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.work_email" placeholder="Work Email" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.vendor_name" placeholder="Vendor Name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.country" placeholder="Country" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.province" placeholder="Province" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.city" placeholder="City" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.phone" placeholder="Phone" style="width: 200px;"  @keyup.enter.native="handleFilter"></el-input>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <!--      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
      <!--        Add-->
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
            <el-form-item label="Address" v-if="props.row.address !=''">
              <span>{{ props.row.address }}</span>
            </el-form-item>

            <el-form-item label="Business Reg Number">
              <span>{{ props.row.busin_reg_num }}</span>
            </el-form-item>
            <el-form-item label="Province">
              <span>{{ props.row.province}}</span>
            </el-form-item>
            <el-form-item label="City">
              <span>{{ props.row.city}}</span>
            </el-form-item>
            <el-form-item label="District">
              <span>{{ props.row.district }}</span>
            </el-form-item>
            <el-form-item label="First Language">
              <span>{{ props.row.first_language }}</span>
            </el-form-item>
            <el-form-item label="Dog Friendly">
            <span v-if="props.row.is_dog_friendly==1">Yes</span>
            <span v-if="props.row.is_dog_friendly==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Event">
              <span v-if="props.row.is_events==1">Yes</span>
              <span v-if="props.row.is_events==0">Unknown</span>
            </el-form-item>
            <el-form-item label="Job Title">
              <span>{{ props.row.job_title }}</span>
            </el-form-item>
            <el-form-item label="Nationality">
              <span>{{ props.row.nationality }}</span>
            </el-form-item>
            <el-form-item label="Vendor Bio">
              <span>{{ props.row.vendor_bio }}</span>
            </el-form-item>

            <el-form-item label="Company Name(EN)">
              <span>{{ props.row.vendor_name_en }}</span>
            </el-form-item>
            <el-form-item label="Category">
              <span>{{ props.row.vendor_type_name }}</span>
            </el-form-item>

            <el-form-item label="Email">
              <span>{{ props.row.work_email }}</span>
            </el-form-item>
            <el-form-item label="Website">
              <span>{{ props.row.website }}</span>
            </el-form-item>
            <el-form-item label="Company Wechat">
              <span>{{ props.row.wechat_public_name }}</span>
            </el-form-item>
            <el-form-item label="Business Reg img" v-if="props.row.busin_reg_img !='' ">
              <el-image style="width: 100px;height: 100px;" :src="props.row.busin_reg_img"  :preview-src-list="[props.row.busin_reg_img]"></el-image>
            </el-form-item>
            <el-form-item label="Profile Photo" v-if="props.row.profile_photo != '' ">
              <el-image style="width: 100px;height: 100px;" :src="props.row.profile_photo"  :preview-src-list="[props.row.profile_photo]"></el-image>
            </el-form-item>
            <el-form-item label="Header Photo" v-if="props.row.header_photo != '' ">
              <el-image style="width: 100px;height: 100px;" :src="props.row.header_photo"  :preview-src-list="[props.row.header_photo]"></el-image>
            </el-form-item>
            <el-form-item label="Logo" v-if="props.row.logo != '' ">
              <el-image style="width: 100px;height: 100px;" :src="props.row.logo"  :preview-src-list="[props.row.logo]"></el-image>
            </el-form-item>
            <el-form-item label="Wechat Qrcode" v-if="props.row.wechat_public_qrcode !='' ">
              <el-image style="width: 100px;height: 100px;" :src="props.row.wechat_public_qrcode"  :preview-src-list="[props.row.wechat_public_qrcode]"></el-image>
            </el-form-item>
            <el-form-item label="Video" v-if="props.row.video_url != '' ">
              <video width="200" :src="props.row.video_url" controls></video>
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
      <el-table-column label="Nickname" width="110">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Wechat Id" width="110">
        <template slot-scope="scope">
          {{ scope.row.wx_id }}
        </template>
      </el-table-column>
      <el-table-column label="First&&Last Name" width="110">
        <template slot-scope="scope">
          {{ scope.row.first_name }} {{scope.row.last_name}}
        </template>
      </el-table-column>
      <el-table-column label="Company Name(CH)" width="110">
        <template slot-scope="scope">
          {{ scope.row.legal_company_name}}
        </template>
      </el-table-column>
      <el-table-column label="Membership Level" width="110">
        <template slot-scope="scope">
<!--          {{scope.row.level}}-->
          <span v-if="scope.row.level == 1">Basic </span>
          <span v-if="scope.row.level == 2">Pro </span>
          <span v-if="scope.row.level == 3">Plus </span>
        </template>
      </el-table-column>
      <el-table-column label="Deal Count" width="110">
        <template slot-scope="scope">
          {{ scope.row.deals_count}}
        </template>
      </el-table-column>
      <el-table-column label="Deal Number" width="110">
        <template slot-scope="scope">
          {{ scope.row.deals_num}}
        </template>
      </el-table-column>
      <el-table-column label="Event Count" width="110">
        <template slot-scope="scope">
          {{ scope.row.event_count}}
        </template>
      </el-table-column>
      <el-table-column label="Event Number" width="110">
        <template slot-scope="scope">
          {{ scope.row.events_num}}
        </template>
      </el-table-column>
      <el-table-column label="Phone" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>


      <el-table-column label="Deals" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleAddDeals(row)">
            Add
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Events" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleAddEvents(row)">
            Add
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="primary"  @click="handleMemberLevel(row,$index)">Upgrade</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormDealsVisible">
      <el-form ref="dataForm"  :model="dealsTempData" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Deal or Discount">
          <el-select v-model="dealsTempData.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dealsType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Deal/Discount Name">
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
        <el-button type="primary" @click="createDeals">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <!--    events-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormEventsVisible">
      <el-form ref="dataForm"  :model="eventsTempData" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Name">
          <el-input  v-model="eventsTempData.name" class="filter-item"  placeholder="Please input"></el-input>
        </el-form-item>
        <el-form-item label="Desc">
          <el-input v-model="eventsTempData.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="IS All">
          <el-select v-model="eventsTempData.is_all" class="filter-item" placeholder="Please select">
            <el-option v-for="item in eventsOne" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Type Desc">
          <el-input v-model="eventsTempData.type_desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Pay Money">
          <el-input type="number" v-model="eventsTempData.pay_money" class="filter-item"  placeholder="Please select"></el-input>
        </el-form-item>
<!--        <el-form-item label="For Unregister">-->
<!--          <el-select v-model="eventsTempData.is_unregister" class="filter-item" placeholder="Please select">-->
<!--            <el-option  label="YES" :value="1" />-->
<!--            <el-option  label="NO" :value="0" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="Popular City">
          <el-select v-model="eventsTempData.city" class="filter-item" placeholder="Please select">
            <el-option v-for="item in popuCityList" :key="item.id" :label="item.object_en" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Location">
          <el-input  v-model="eventsTempData.location" class="filter-item"  placeholder="Please select"></el-input>
        </el-form-item>

        <el-form-item label="Date" >
          <!--          <el-input v-model="temp.birthday" />-->
          <el-date-picker
            v-model="eventsTempData.date"
            type="date"
            placeholder="Please picker a date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Start Time & End Time">
          <el-time-select
            placeholder="Start Time"
            v-model="eventsTempData.start_time"
            :picker-options="{
      start: '00:00',
      step: '00:01',
      end: '24:00'
    }">
          </el-time-select>
          <el-time-select
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
        <el-button type="primary" @click="createEvents">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <!--    编辑vendor信息-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 600px; margin-left:50px;">
        <el-form-item label="logo">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action=uploadRequestUrl
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadLogoSuccess"
            :file-list="logoFileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
        <el-form-item  label="Wechat Qrcode">
          <el-upload
            class="upload-demo"
            drag
            :headers="uploadHeaders"
            name="file[]"
            :action=uploadRequestUrl
            multiple
            list-type="picture"
            :limit="1"
            :on-success="uploadWechatQrcodeSuccess"
            :file-list="wechatQrcodeFileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag the file here, or <em>click to upload</em></div>
            <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
        <el-form-item label="Wechat Public Name" prop="wechat_public_name">
          <el-input v-model="temp.wechat_public_name" />
        </el-form-item>
        <el-form-item label="Company English Name" prop="vendor_name_en">
          <el-input v-model="temp.vendor_name_en" />
        </el-form-item>
        <el-form-item label="Vendor Introduction" prop="vendor_bio">
          <el-input v-model="temp.vendor_bio" />
        </el-form-item>
        <el-form-item label="Email" prop="work_email">
          <el-input v-model="temp.work_email" />
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormUpgrade">
      <!--      :rules="rules"-->
      <el-form ref="dataForm"  :model="tempUpgrade" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Identity" prop="identity">
          <el-select @change="changeIdentity" v-model="tempUpgrade.identity" class="filter-item" placeholder="Choose Identity">
            <el-option v-for="item in identityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Level" prop="levelId">
          <el-select v-model="tempUpgrade.levelId" class="filter-item" placeholder="Choose Level">
            <el-option v-for="item in levelOptions" :key="item.id" :label="item.level_en" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpgrade = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="upgradeLevel()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { userList, editUserInfo, deleteUser, vipList, changeVipLevel, userObjectList,vendorList,addVendorBasic } from '@/api/member'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { addDeals } from '@/api/deals' // secondary package based on el-pagination
import {addEvent} from '@/api/events'

export default {
  name: 'index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        0: 'danger',
        3:'danger'
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
      eventsOne:[{label:'Social',value:1},{label:'Professional',value: 2}],
      allowedDogOptions:[{label:"Yes",value:1},{label: "No",value: 0}],
      userListData:[],
      popuCityList:[],
      dialogFormDealsVisible:false,

      dealsTempData:{
        user_id:1,
        is_unregister:undefined,
        type:undefined,
        is_all:undefined,
        file:undefined,
        due_contract:undefined,
        pay_money:undefined,
        desc:undefined,
        deal_id:undefined,
        city:undefined,
        location:undefined,
        identity:undefined,
        file_name:undefined,
      },
      fileUrl:undefined,
      fileList:undefined,
      eventsFileUrl:undefined,
      logoFileList:undefined,
      wechatQrcodeFileList:undefined,
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
        file_name: undefined

      },

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        nickname:undefined,
        truename:undefined,
        phone:undefined,
        is_educator:undefined,
        is_business:undefined,
        is_vendor:undefined,
        is_other:undefined,
        is_seeking:undefined,
        sex:undefined
      },
      percentOptions:[0,10, 20, 30,40,50,60,70,80,90,100],
      seekingOptions:[{label:'no',value:0},{label:'Yes',value:1}],
      sexOptions:[{label:'unco',value:0},{label:'Male',value:1},{label:'Female',value:2}],
      identityOptions:[{label:'Educator',value:1},{label:'Business',value:2},{label:'Vendor',value:3}],
      levelOptions:[],
      vipList:[],

      importanceOptions: [10, 20, 30,40,50,60,70,80,90,100],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        user_id:undefined,
        email:undefined,
        logo:undefined,
        wechat_public_qrcode:undefined,
        wechat_public_name:undefined,
        vendor_name_en:undefined,
        vendor_bio:undefined,
        work_email:undefined
      },
      tempUpgrade:{
        identity:undefined,
        levelId:undefined
      },
      dialogFormVisible: false,
      dialogFormUpgrade:false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create',
        upgrade:'Upgrade',
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // username: [{ required: true, message: 'username is required', trigger: 'change' }],
        // birthday: [{ type: 'date', required: true, message: 'birthday is required', trigger: 'change' }],
        // nickname: [{ required: true, message: 'nickname is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogUserDetailVisible:false,
      userDetailData:[]

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
    this.getVipList()
    this.getUserObjList()
  },
  methods: {
    getUserObjList(){
      userObjectList({pid:71}).then(res=>{
        console.log(res)
        this.popuCityList = res.message
      })
    },
    handleAddDeals(row){
      this.dialogFormDealsVisible=true
      this.dealsTempData.user_id = row.user_id;
    },
    handleAddEvents(row){
      this.dialogFormEventsVisible=true
      this.dealsTempData.user_id = row.user_id;
    },
    createEvents(){
      console.log(this.eventsTempData)
      // console.log(tempData.birthday.getFullYear())
      let year = this.eventsTempData.date.getFullYear()
      let  month = this.eventsTempData.date.getMonth()+1
      let day = this.eventsTempData.date.getDate()

      this.eventsTempData.date =  year+'-'+month+'-'+day

      // if(this.eventsTempData.is_unregister==1){
      //   this.eventsTempData.user_id = 1
      // }
      addEvent(this.eventsTempData).then(response=>{
        console.log(response)
        if(response.code == 200){
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          this.dialogFormEventsVisible=false
          this.eventsTempData =  {
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
            is_unregister: 0
          }
        }
      })
    },
    createDeals(){
      console.log(this.dealsTempData)
      // if(this.dealsTempData.is_unregister==1){
      //   this.dealsTempData.user_id = 1
      // }
      addDeals(this.dealsTempData).then(response=>{
        console.log(response)
        if(response.code == 200){
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          this.dialogFormDealsVisible=false
        }
      })
    },
    uploadFileSuccess(response,file,fileList){
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200){
        this.fileUrl = response.data[0].file_url
        this.dealsTempData.file = response.data[0].file_url
        this.dealsTempData.file_name = file.name

      }else{
        console.log(response.msg)
      }
    },
    uploadEventsFileSuccess(response,file,eventsFileList){
      console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.code == 200){
        this.eventsFileUrl = response.data[0].file_url
        this.eventsTempData.file = response.data[0].file_url
        this.eventsTempData.file_name = file.name

      }else{
        console.log(response.msg)
      }
    },
    uploadLogoSuccess(response,file,eventsFileList){
      if (response.code == 200){
        this.logoFileList = [{name:'',url:response.data[0].file_url}]
        this.temp.logo = response.data[0].file_url
      }else{
        console.log(response.msg)
      }
    },
    uploadWechatQrcodeSuccess(response,file,eventsFileList){
      if (response.code == 200){
        this.wechatQrcodeFileList = [{name:'',url:response.data[0].file_url}]
        this.temp.wechat_public_qrcode = response.data[0].file_url
      }else{
        console.log(response.msg)
      }
    },
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      vendorList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.message.data
        this.total = response.message.total
        console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeIdentity(e){
      // console.log(e)
      // this.levelOptions = []
      if(e==1){
        this.tempUpgrade.levelId=undefined
        this.levelOptions = this.vipList.filter(item=>item.identity==1)
      }
      if(e==2){
        this.tempUpgrade.levelId=undefined
        this.levelOptions = this.vipList.filter(item=>item.identity==2)
      }
      if(e==3){
        this.tempUpgrade.levelId=undefined
        this.levelOptions = this.vipList.filter(item=>item.identity==3)
      }
      console.log(this.levelOptions)

    },
    getVipList(){
      vipList().then(response=>{
        console.log(response)
        this.vipList = response.message;
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
      this.temp.user_id = row.user_id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.logoFileList = [{name:'',url:row.logo}]
      this.wechatQrcodeFileList = [{name:'',url:row.wechat_public_qrcode}]
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp)
          const tempData = Object.assign({}, this.temp)

          addVendorBasic(tempData).then((res) => {
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
          })
        }
      })
    },
    handleDelete(row, index) {

      // this.list.splice(index, 1)
      deleteUser({
        user_id:row.id,
        is_delete:1
      }).then(res=>{
        console.log(res)
        if (res.code === 200){
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList();
        }else{
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'wrong',
            duration: 2000
          })
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    handleMemberLevel(row,index){
      // this.tempUpgrade = Object.assign({}, row) // copy obj
      this.tempUpgrade.user_id = row.user_id
      console.log(row)
      this.dialogStatus = "Upgrade"
      this.dialogFormUpgrade = true
      this.tempUpgrade.levelId = undefined
      this.tempUpgrade.identity = undefined
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    upgradeLevel(){
      var that = this;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tempUpgrade)
          const tempData = Object.assign({}, this.tempUpgrade)
          // const tempObj = {}
          // tempObj.username = this.temp.username
          // tempObj.nickname = this.temp.nickname
          let data = {
            user_id:tempData.user_id,
            identity:tempData.identity,
            level_id:tempData.levelId
          }
          changeVipLevel(data).then(response=>{
            console.log(response)
            if(response.code == 200){

              setTimeout(function(){
                that.$notify({
                  title: 'Success',
                  message: 'Upgrade Successfully',
                  type: 'success',
                  duration: 2000
                })
                that.dialogFormUpgrade = false
              },2000)

            }

          })
          // console.log(tempData)

        }
      })
    },
    handleRecover(row, index) {

      // this.list.splice(index, 1)
      deleteUser({
        user_id:row.id,
        is_delete:0
      }).then(res=>{
        console.log(res)
        if (res.code === 200){
          this.$notify({
            title: 'Success',
            message: 'Recover Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList();

        }else{
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'wrong',
            duration: 2000
          })
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    handleFetchDetail(detail){
      this.dialogUserDetailVisible=true
      this.userDetailData.push(detail)
      console.log(detail)
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
        const tHeader = ['id', 'name', 'phone', 'is_educator', 'is_business','is_vendor','is_other','is_seeking','identity']
        const filterVal = ['id', 'name', 'phone', 'is_educator', 'is_business','is_vendor','is_other','is_seeking','identity']
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
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  /*width: 90px;*/
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
</style>
