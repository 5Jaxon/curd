<template>
    <breadCrumb :item="item"/>
    <div class="overview-wrapped">
		<!-- 顶部内容外壳 -->
		<div class="top-content-wrapped">
			<!-- 个人信息 -->
			<div class="person-infor">
				<!-- 用户头像外壳 -->
				<div class="person-avatar-wrapped">
					<el-avatar :size="100" :src="userData.imageUrl" />
					<span class="department">所属部门：{{userData.department}}</span>
					<div class="company">所属公司：{{ companyName }}</div>
				</div>
				<!-- 竖线 -->
				<div class="line-wrapped">
					<div class="line"></div>
				</div>
				<!-- 详细信息外壳 -->
				<div class="detail-infor-wrapped">
					<p>姓名：{{userData.name}}</p>
					<p>性别：{{userData.sex}}</p>
					<p>身份：{{userData.identity}}</p>					
				</div>
			</div>
			<div class="manage-user pie"></div>
		</div>
		<!-- 中间内容外壳 -->
		<div class="mid-content-wrapped">
			<div class="product-category-bar mid-content-left"></div>
			<div class="mid-content-right">
				 <div class="title">常用管理</div>
                 <el-row :gutter="20">
                    <el-col :span="6" @click="router.push('/menu/user_manage')">
                        <div class="button-area" >
                            <SvgIcon icon-name="user" style="width:20;height: 20px;"></SvgIcon>
                            <span class='button-name'>用户管理</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area" @click="router.push('/menu/product_manage')">
                            <SvgIcon icon-name="product" style="width:20;height: 20px;"></SvgIcon>
                            <span class='button-name'>产品管理</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area" >
                            <SvgIcon icon-name="message" style="width:20;height: 20px;"></SvgIcon>
                            <span class='button-name'>个人消息</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area" @click="router.push('/menu/set')">
                            <SvgIcon icon-name="set" style="width:20;height: 20px;"></SvgIcon>
                            <span class='button-name'>系统设置</span>
                        </div>
                    </el-col>
                </el-row>
			</div>
		</div>
		<!-- 底部内容外壳 -->
		<div class="footer-content-wrapped">
			<div class="massage-level footer-content-left"></div>
			<div class="login-week footer-content-right"></div>
		</div>
	</div>

</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import { ref } from 'vue';
import {getCompanyName}from '@/api/setting';
import useUserInfo from '@/store/userinfo'
import * as echarts from 'echarts'
import { onMounted } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import {getUser,getProduct,getMessage,getLogin}from '@/api/overview';
import { Bottom } from '@element-plus/icons-vue/dist/types';
import { messageConfig } from 'element-plus';
import { useRouter } from 'vue-router';
const router=useRouter();

// 管理员与用户比值图
const manageUser = () => {
// 通过类名 初始化    
	const mu = echarts.init(document.querySelector('.manage-user') as HTMLElement)
	document.querySelector('.manage-user')!.setAttribute('_echarts_instance_', '')
	// 设置基本的参数
		mu.setOption({
			title: {
				text: '管理与用户对比图',				
				left: 'left',
				top:'top'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				top:'10%',
				padding: [20, 20, 20, 20]
			},
			series: [
				{
					// name: 'Access From',
					type: 'pie',
					radius: '65%',
					center:['60%','50%'],
					data: user ,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},labelLayout: {        
						hideOverlap: true
					}
				}
			]
		})
	// 用于echarts响应式
	window.addEventListener('resize', function () {
		mu.resize()
	})
}

// 产品类别图
const productCategoryBar = async () => {
	const pcb = echarts.init(document.querySelector('.product-category-bar') as HTMLElement)
	document.querySelector('.product-category-bar')!.setAttribute('_echarts_instance_', '')
		pcb.setOption({
			grid:{
				left:'12%',
				top:'18%',
				right: '5%',
				bottom: '15%'
			},
			title: {
				text: "产品类别库存总价图",
				top: "3%",
				textStyle: {
					fontSize: 16
				},
			},
			tooltip: {
				trigger: 'axis',
			},
			xAxis: {
				type: 'category',
				// 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
				data: category 
			},
			yAxis: {				
				type: 'value',
				axisLabel: {
					formatter: function (value) {
						if (value >= 1000000) {
							return (value / 1000000).toFixed(1) + 'M'; // 百万单位
						} else if (value >= 10000) {
							return (value / 1000).toFixed(1) + 'K'; // 千单位
						} else {
							return value;
						}
					}
				},
				scale: true // 自动调整比例
			},
			series: [
				{
					data: price ,
					type: 'bar',
					barWidth: 40,
					colorBy: "data"
				},
			]
		})
	window.addEventListener('resize', function () {
		pcb.resize()
	})
}

// 公告等级分布图
const massageLevel = () => {
	const ml = echarts.init(document.querySelector('.massage-level') as HTMLElement)
	document.querySelector('.massage-level')!.setAttribute('_echarts_instance_', '')
		ml.setOption({
			title: {
				text: "公告等级分布图",
				top: "3%",
				textStyle: {
					fontSize: 16
				},
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				top:'10%',
				padding: [20, 20, 20, 20]
			},
			series: [
				{
					center:['60%','50%'],
					type: 'pie',
					radius: ['35%', '65%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 40,
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: messagedata ,
				}
			]
		})
	window.addEventListener('resize', function () {
		ml.resize()
	})
}

const loginNumber = () => {

	const mad = echarts.init(document.querySelector('.login-week')as HTMLElement)
	document.querySelector('.login-week')!.setAttribute('_echarts_instance_', '')
		mad.setOption({
			grid:{
				left:'8%',
				top:'22%',
				right: '5%',
				bottom: '20%'
			},
			title: {
				text: "每日登录人数图",
				top: "3%",
				textStyle: {
					fontSize: 16
				},
			},
			tooltip: {
				trigger: 'item'
			},
			xAxis: {
				type: 'category',
				data: week.reverse(),
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: number.reverse(),
					type: 'line'
				}
			]
		})
	window.addEventListener('resize', function () {
		mad.resize()
	})
}

const item=ref({first:'系统概览'})
const userData=useUserInfo();
const companyName=ref();
let user,week,number;
let category;
let price;
let messagedata;
(async()=>{    
	let res=await Promise.all([getCompanyName(),getUser(),getProduct(),getMessage(),getLogin()])
	companyName.value =res[0];
	user =res[1];
	price =res[2].price;
	category =res[2].category;
	messagedata =res[3].map(item=>({name:item.name||"未知",value:item.value}));		
	({count:number,days:week}=res[4]);
	
	manageUser()
	productCategoryBar()
	massageLevel()
	loginNumber()
	
})();

</script>


<style lang="scss" scoped>

	// 总览内容
	.overview-wrapped {
		padding: 8px;
		height: calc(100vh - 85px);
		background: #f8f8f8;
        overflow: auto;
		// 上部分内容 个人资料 + 饼状图
		.top-content-wrapped {
			height: 30%;
			display: flex;

			// 个人信息
			.person-infor {
				height: 100%;
				margin-right: 8px;
				width: calc(50% - 8px);
				display: flex;
				background: #fff;

				// 头像区域
				.person-avatar-wrapped {
					display: flex;
					width: 50%;
					height: 100%;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					// 公司
					.company , .department {
						margin: 10px 0px;
						font-size: 12px;
					}
					// 职务
					.level {
						margin-top: 8px;
						font-size: 12px;
					}

				}

				// 分割线
				.line-wrapped {
					height: 100%;
					display: flex;
					align-items: center;

					.line {
						height: 170px;
						border: 1px solid #D3D3D3;
					}
				}

				// 详细信息区域
				.detail-infor-wrapped {
					height: 100%;
					width: calc(50% - 1px);
					margin-left: 50px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
				}
			}

			// 饼状图
			.pie {
				width: calc(50%);
				height: 100%;
				background: #fff;
			}
		}

		// 中间部分内容 消息阅读量图 产品类别图
		.mid-content-wrapped {
			margin-top: 8px;
			min-height: calc(32% - 8px);
			display: flex;

			// 中间左部分
			.mid-content-left {
				margin-right: 8px;
				width: calc(60% - 8px);
				background: #fff;
			}

			// 中间右部分
			.mid-content-right {
				width: calc(40%);
				background: #fff;
				padding: 8px;

				// 标题
				.title {
					font-size: 14px;
					margin-bottom: 8px;
				}

				// 按钮区域
				.button-area {
					margin-bottom: 8px;
					height: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					background: #F5F5F5;

					// 按钮名字
					.button-name {
						margin-top: 10px;
					}
				}

				// 按钮变色
				.button-area:hover {
					background: #e4efff;
				}
			}
		}

		// 底部内容
		.footer-content-wrapped {
			margin-top: 8px;
			height: calc(38% - 8px);
			display: flex;

			// 底部左部分
			.footer-content-left {
				margin-right: 8px;
				height:100%;
				width: calc(30% - 8px);
				background: #fff;
			}

			// 底部右部分
			.footer-content-right {
				height:100%;
				width: calc(70%);
				background: #fff;
			}
		}
	}

</style>