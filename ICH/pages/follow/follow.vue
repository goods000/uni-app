<template>
	<view class="content">
		<view class="initHeader initHeader--bgWhite initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-title">跟单</view>
			</view>
		</view>
		<!-- <view class="header">
			<view class="tabBox">
				<view class="tab" @tap="change(index)" :class="{ active: activeTab == index }" v-for="(item, index) in tabList" :key="index">{{ item.name }}</view>
			</view>
		</view> -->
		<view class="body">
			<view class="usdt" v-if="activeTab == 0">
				<view class="select">
					<view class="left">
						<view class="mg-r" @tap="sortNumSelect(1)">
							<view class="num" :class="{ active: sortNum == 1 }">跟单者</view>
							<view class="img">
								<image :src="sortNum == 1 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 1 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
						<view class="mg-r" @tap="sortNumSelect(2)">
							<view class="num" :class="{ active: sortNum == 2 }">总收益</view>
							<view class="img">
								<image :src="sortNum == 2 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 2 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
						<view class="" @tap="sortNumSelect(3)">
							<view class="num" :class="{ active: sortNum == 3 }">入驻时间</view>
							<view class="img">
								<image :src="sortNum == 3 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 3 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
					</view>
					<view class="right">
						<view
							class="tab uni-border-radius"
							:class="[
								{ active: item.select },
								{ isSelect: selectLength > 0 && index == 0 ? true : false },
								{ isBourse: bourseLength > 0 && index == 1 ? true : false },
								pixelClass
							]"
							v-for="(item, index) in numSelectList"
							:key="index"
							:data-id="item.id"
							@tap="numSelect(item.id)"
						>
							{{ item.name }}
							<text v-if="selectLength > 0 && index == 0">∙{{ selectLength }}</text>
							<text v-if="bourseLength > 0 && index == 1">∙{{ bourseLength }}</text>
						</view>
					</view>
				</view>
				<view class="listBox">
					<view v-if="usdtList.length == 0" class="noData">
						<image src="/static/follow/noTrader.png" mode=""></image>
						没有找到相关交易员
					</view>
					<view v-else class="inner">
						 <!-- @tap.stop="jumptraders(item.userId, item.currencyName, item.bourseId, item.contractType)" -->
						<view class="list" v-for="(item, index) in usdtList" :key="index">
							<view class="top-item">
								<view class="topOrientation">
									<!-- <view>正向{{item.sameOrientation}}</view>
									<view>反向{{item.reserveOrientation}}</view> -->
									<view class="sameOrientation" style="background-image: url(../../static/follow/forward-left.png);">正向{{ item.sameOrientation }}</view>
									<view class="reserveOrientation" style="background-image: url(../../static/follow/reverse-right.png);">反向{{ item.reserveOrientation }}</view>
								</view>
								<!-- <view class="bourse-name">{{ item.bourseName }}</view> -->
								<view class="bourse-name"><image src="../../static/follow/boursepic.png" mode="widthFix"></image></view>
							</view>
							<view class="top">
								<view class="left" @click.stop="gotraders(item.id, item.bourseName, item.currencyName, 1)">
									<view class="img">
										<image
											class="userPic"
											lazy-load="true"
											:src="item.userImage == null || item.userImage == '' ? '../../static/my/basePic.png' : item.userImage"
											mode=""
										></image>
										<image class="currency" src="../../static/follow/USDT.png" mode=""></image>
									</view>
									<view class="user">
										<view class="name">
											<view class="tit uni-ellipsis">{{ item.userName | nameverify }}</view>
											<image :src="'../../static/grade' + item.userLever + '.png'" mode=""></image>
										</view>
										<!-- <view class="type" style="color: #f2bc24;">{{ item.bourseName }}交易员</view> -->
										<view class="strategy-list">
											<view
												class="type"
												style="margin-left: 8upx; padding: 2upx; border-radius: 8upx; color: #FFFFFF; background-color: #2989fd;"
												v-for="(items, index) in item.strategy"
												:key="index"
											>
												{{ items }}
											</view>
										</view>
									</view>
								</view>
								<view v-if="item.following == false" class="btn" @click.stop="clickfollow(0, item.id, item.userImage, item.userName, item.currencyName)">跟单</view>
								<view v-else class="btn active" @click.stop="clickfollow(1, item.id, item.userImage, item.userName, item.currencyName)">跟单中</view>
							</view>
							<view class="foot">
								<view class="middle">
									<view v-if="item.traderFund == 0" style="text-align: center;" :class="{ loss: item.traderProfit / item.traderFund < 0 }" class="num yield">
										0%
									</view>
									<view v-if="item.traderFund != 0" style="text-align: center;" :class="{ loss: item.traderProfit / item.traderFund < 0 }" class="num yield">
										{{ ((item.traderProfit / item.traderFund) * 100) | number(2) }}%
									</view>
									<view class="msg" style="text-align: center;">收益率</view>
								</view>
								<view class="middle">
									<view class="num" style="text-align: center;" :class="{ loss: item.traderProfit < 0 }">{{ item.traderProfit | number(2) }}</view>
									<view class="msg" style="text-align: center;">总收益({{ item.currencyName }})</view>
								</view>
								<view>
									<view class="num" style="text-align: center;">{{ item.followCountVirtual + item.followCountReal }}</view>
									<view class="msg" style="text-align: center;">跟单人数</view>
								</view>
							</view>
						</view>
						<view class="loading" v-if="loading1 && activeTab == 0"><image src="../../static/follow/loading.png" mode=""></image></view>
					</view>
				</view>
			</view>
			<view class="number" v-if="activeTab == 1">
				<view class="select">
					<view class="left">
						<view class="mg-r" @tap="sortNumSelect(1)">
							<view class="num" :class="{ active: sortNum == 1 }">跟单者</view>
							<view class="img">
								<image :src="sortNum == 1 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 1 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
						<view class="mg-r" @tap="sortNumSelect(2)">
							<view class="num" :class="{ active: sortNum == 2 }">总收益</view>
							<view class="img">
								<image :src="sortNum == 2 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 2 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
						<view class="" @tap="sortNumSelect(3)">
							<view class="num" :class="{ active: sortNum == 3 }">入驻时间</view>
							<view class="img">
								<image :src="sortNum == 3 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 3 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
					</view>
					<view class="right">
						<view
							class="tab uni-border-radius"
							:class="[
								{ active: item.select },
								{ isSelect: selectLength > 0 && index == 0 ? true : false },
								{ isBourse: bourseLength > 0 && index == 1 ? true : false },
								pixelClass
							]"
							v-for="(item, index) in numSelectList"
							:key="index"
							:data-id="item.id"
							@tap="numSelect(item.id)"
						>
							{{ item.name }}
							<text v-if="selectLength > 0 && index == 0">∙{{ selectLength }}</text>
							<text v-if="bourseLength > 0 && index == 1">∙{{ bourseLength }}</text>
						</view>
					</view>
				</view>
				<view class="listBox">
					<view v-if="numList.length == 0" class="noData">
						<image src="/static/follow/noTrader.png" mode=""></image>
						没有找到相关交易员
					</view>
					<view v-else class="inner">
						 <!-- @tap.stop="jumptraders(item.userId, item.currencyName, item.bourseId, item.contractType)" -->
						<view class="list" v-for="(item, index) in numList" :key="index">
							<view class="top-item">
								<view class="topOrientation">
									<!-- <view>正向{{item.sameOrientation}}</view>
									<view>反向{{item.reserveOrientation}}</view> -->
									<view class="sameOrientation" style="background-image: url(../../static/follow/forward-left.png);">正向{{ item.sameOrientation }}</view>
									<view class="reserveOrientation" style="background-image: url(../../static/follow/reverse-right.png);">反向{{ item.reserveOrientation }}</view>
								</view>
								<view class="bourse-name"><image src="../../static/follow/boursepic.png" mode="widthFix"></image></view>
							</view>

							<view class="top">
								<view class="left" @click.stop="gotraders(item.id, item.bourseName, item.currencyName, 1)">
									<view class="img">
										<image
											class="userPic"
											lazy-load="true"
											:src="item.userImage == null || item.userImage == '' ? '../../static/my/basePic.png' : item.userImage"
											mode=""
										></image>
										<image class="currency" :src="item.currencyLogo" mode=""></image>
									</view>
									<view class="user">
										<view class="name">
											<view class="tit uni-ellipsis">{{ item.userName | nameverify }}</view>
											<image :src="'../../static/grade' + item.userLever + '.png'" mode=""></image>
										</view>
										<!-- <view class="type" style="color: #f2bc24;">{{ item.bourseName }}交易员</view> -->
										<view class="strategy-list">
											<view
												class="type"
												style="margin-left: 8upx; padding: 2upx; border-radius: 8upx; color: #FFFFFF; background-color: #2989fd;"
												v-for="(items, index) in item.strategy"
												:key="index"
											>
												{{ items }}
											</view>
										</view>
									</view>
								</view>
								<view v-if="item.following == false" class="btn" @click.stop="clickfollow(0, item.id, item.userImage, item.userName, item.currencyName)">跟单</view>
								<view v-else class="btn active" @click.stop="clickfollow(1, item.id, item.userImage, item.userName, item.currencyName)">跟单中</view>
							</view>
							<view class="foot">
								<view class="middle">
									<view v-if="item.traderFund == 0" style="text-align: center;" :class="{ loss: item.traderProfit < 0 }" class="num yield">0%</view>
									<view v-if="item.traderFund != 0" style="text-align: center;" :class="{ loss: item.traderProfit < 0 }" class="num yield">
										{{ ((item.traderProfit / item.traderFund) * 100) | number(2) }}%
									</view>
									<view class="msg" style="text-align: center;">收益率</view>
								</view>
								<view class="middle">
									<view class="num" style="text-align: center;">{{ item.traderProfit | number(2) }}</view>
									<view class="msg" style="text-align: center;">总收益({{ item.currencyName }})</view>
								</view>
								<view>
									<view class="num" style="text-align: center;">{{ item.followCountVirtual + item.followCountReal }}</view>
									<view class="msg" style="text-align: center;">跟单人数</view>
								</view>
							</view>
						</view>
						<view class="loading" v-if="loading1 && activeTab == 1"><image class="" src="../../static/follow/loading.png" mode=""></image></view>
					</view>
				</view>
			</view>
			<!-- 晋级 -->
			<view class="promoted" v-if="activeTab == 2">
				<view class="select">
					<view class="left">
						<view class="mg-r" @tap="sortNumSelect(1)">
							<view class="num" :class="{ active: sortNum == 1 }">跟单者</view>
							<view class="img">
								<image :src="sortNum == 1 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 1 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
						<view class="mg-r" @tap="sortNumSelect(2)">
							<view class="num" :class="{ active: sortNum == 2 }">总收益</view>
							<view class="img">
								<image :src="sortNum == 2 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 2 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
						<view class="" @tap="sortNumSelect(3)">
							<view class="num" :class="{ active: sortNum == 3 }">入驻时间</view>
							<view class="img">
								<image :src="sortNum == 3 && tooggle == 2 ? '../../static/follow/sortTop1.png' : '../../static/follow/sortTop.png'" mode=""></image>
								<image class="top" :src="sortNum == 3 && tooggle == 1 ? '../../static/follow/sortDown1.png' : '../../static/follow/sortDown.png'" mode=""></image>
							</view>
						</view>
					</view>
					<view class="right">
						<view
							class="tab uni-border-radius"
							:class="[
								{ active: numSelectList[0].select },
								{ isSelect: selectLength > 0 && index == 0 ? true : false },
								{ isBourse: bourseLength > 0 && index == 1 ? true : false },
								pixelClass
							]"
							:data-id="numSelectList[0].id"
							@tap="numSelect(numSelectList[0].id)"
						>
							{{ numSelectList[0].name }}
							<text v-if="selectLength > 0 && index == 0">∙{{ selectLength }}</text>
							<text v-if="bourseLength > 0 && index == 1">∙{{ bourseLength }}</text>
						</view>
					</view>
				</view>
				<view class="listBox">
					<!-- <view v-if="optionlists.length == 0" class="noData">
						<image src="/static/follow/noTrader.png" mode=""></image>
						没有找到相关交易员
					</view> -->
					<view class="inner">
						<view class="list" v-for="(item, index) in optionlists" :key="index" @tap.stop="jumpoptionfollow()">
							<view class="top-item">
								<view class="topOrientation">
									<view class="sameOrientation" style="background-image: url(../../static/follow/forward-left.png);">正向{{ item.sameOrientation }}</view>
									<view class="reserveOrientation" style="background-image: url(../../static/follow/reverse-right.png);">反向{{ item.reserveOrientation }}</view>
								</view>
							</view>
							<view class="top">
								<view class="left" @click.stop="gotraders(item.id, item.bourseName, item.currencyName, 2)">
									<view class="img">
										<image
											class="userPic"
											lazy-load="true"
											:src="item.userImage == null || item.userImage == '' ? '../../static/my/basePic.png' : item.userImage"
											mode=""
										></image>
										<image class="currency" :src="item.currencyLogo" mode=""></image>
									</view>
									<view class="user">
										<view class="name">
											<view class="tit uni-ellipsis">{{ item.userName }}</view>
											<image :src="'../../static/grade' + item.userLever + '.png'" mode=""></image>
										</view>
										<!-- <view class="type">交易员</view> -->
										<!-- <view class="type" style="color: #f2bc24;">{{ item.strategy }}</view> -->
										<view class="strategy-list">
											<view
												class="type"
												style="margin-left: 8upx; padding: 2upx; border-radius: 8upx; color: #FFFFFF; background-color: #2989fd;"
												v-for="(items, index) in item.strategy"
												:key="index"
											>
												{{ items }}
											</view>
										</view>
									</view>
								</view>
								<view
									v-if="item.following == false"
									class="btn"
									@click.stop="clickoptionfollow(item.userImage, item.userName, item.currencyName, item.id, item.following)"
								>
									跟单
								</view>
								<view v-else class="btn active" @click.stop="clickoptionfollow(item.userImage, item.userName, item.currencyName, item.id, item.following)">
									跟单中
								</view>
							</view>
							<view class="foot">
								<view class="middle">
									<view v-if="item.traderFund == 0" style="text-align: center;" :class="{ loss: item.traderProfit < 0 }" class="num yield">0%</view>
									<view v-if="item.traderFund != 0" style="text-align: center;" :class="{ loss: item.traderProfit < 0 }" class="num yield">
										{{ ((item.traderProfit / item.traderFund) * 100) | number(2) }}%
									</view>
									<view class="msg" style="text-align: center;">收益率</view>
								</view>
								<view class="middle">
									<view class="num" style="text-align: center;">{{ item.traderProfit | number(2) }}</view>
									<view class="msg" style="text-align: center;">总收益(USDT)</view>
								</view>
								<view>
									<view class="num" style="text-align: center;">{{ item.followCountVirtual + item.followCountReal }}</view>
									<view class="msg" style="text-align: center;">跟单人数</view>
								</view>
							</view>
						</view>
						<!-- <view class="loading" v-if="loading1 && activeTab == 2"><image class="" src="../../static/follow/loading.png" mode=""></image></view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 筛选 -->
		<view v-if="numSelectList[0].select" class="selectBox" @touchmove.stop.prevent="moveHandle">
			<view class="uni-mask" @tap="hideSelect"></view>
			<view class="dorpDown1">
				<!-- <view class="currency" v-if="activeTab == 1">
					<view class="tit">交易币种</view>
					<view class="listBox">
						<view @tap="currencySelect(item.id)" class="item uni-border-radius" v-for="(item, index) in currencyList" :key="index" :class="[{ active: item.select }, pixelClass]">
							{{ item.name }}
						</view>
					</view>
				</view> -->
				<!-- <view class="trader">
					<view class="tit">交易员评级</view>
					<view class="listBox">
						<view @tap="traderSelect(item.id)" class="item uni-border-radius" v-for="(item, index) in traderList" :key="index" :class="[{ active: item.select }, pixelClass]">
							{{ item.name }}
						</view>
					</view>
				</view> -->
				<view class="enter">
					<view class="tit">入驻时长</view>
					<view class="listBox">
						<view
							@tap="enterSelect(item.id)"
							class="item uni-border-radius"
							v-for="(item, index) in enterList"
							:key="index"
							:class="[{ active: item.select }, pixelClass]"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
				<view class="btnBox">
					<view class="cancel" @tap="selectCancel">重置</view>
					<view class="confirm" @tap="selectConfirm">确定</view>
				</view>
			</view>
		</view>
		<view v-if="numSelectList[1].select" class="selectBox" @touchmove.stop.prevent="moveHandle">
			<view class="uni-mask" @tap="hideSelect"></view>
			<view class="dorpDown2">
				<view class="exchange">
					<view class="tit">交易所</view>
					<view class="listBox">
						<view
							@tap="exchangeSelect(item.id)"
							class="item uni-border-radius"
							v-for="(item, index) in exchangeList"
							:key="index"
							:class="[{ active: item.select }, pixelClass]"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
				<view class="btnBox">
					<view class="cancel" @tap="tradeCancel">重置</view>
					<view class="confirm" @tap="tradeConfirm">确定</view>
				</view>
			</view>
		</view>
		<!-- 检测身份登录 -->
		<neil-modal :show="showPop" @confirm="confirm" @close="close" title="请您先完成身份认证" confirm-text="去认证" cancel-text="取消"></neil-modal>
		<!-- 绑定账户 -->
		<neil-modal :show="showAuth" @confirm="confirmAuth" @close="closeAuth" title="您还未绑定交易账户" confirm-text="去绑定" cancel-text="取消"></neil-modal>
	</view>
</template>

<script>
import webUrl from '../../components/url.js';
import neilModal from '@/components/neil-modal/neil-modal.vue';
export default {
	components: {
		neilModal
	},
	data() {
		return {
			digits: 4,
			digits1: 2,
			src: webUrl.slideURL,
			basePthURL: webUrl.basePthURL,
			pixelRatio: '',
			pixelClass: '',
			activeTab: 0,
			activeInnerTab: '',
			pageSize: 20,
			pageNum: 1,
			pages: 0,
			activeSelect: '',
			showSelect: false,
			data: '',
			contractType: 2, //数字合约：1 ，USDT：2
			userLever: [], //交易等级
			bourseId: [], //交易所id
			currencyNameId: [], //币种名称
			timeQueryType: [], //入驻时长
			tabList: [
				// {
				// 	name: '跟单',
				// 	id: 0
				// },
				{
					name: 'USDT',
					id: 0
				},
				{
					name: '数字',
					id: 1
				},
				{
					name: '期权',
					id: 2
				}
			],
			numSelectList: [
				{
					name: '筛选条件',
					id: '0',
					select: false
				},
				{
					name: '交易所',
					id: '1',
					select: false
				}
			],
			numList: [],
			usdtList: [],
			optionlists: [],
			currencyList: [],
			traderList: [
				{
					name: '新秀',
					id: 1,
					select: false
				},
				{
					name: '高级',
					id: 2,
					select: false
				},
				{
					name: '大咖',
					id: 3,
					select: false
				},
				{
					name: '明星',
					id: 4,
					select: false
				}
			],
			enterList: [
				{
					name: '1周以上',
					id: 1,
					select: false
				},
				{
					name: '1月以上',
					id: 2,
					select: false
				},
				{
					name: '半年以上',
					id: 3,
					select: false
				},
				{
					name: '1年以上',
					id: 4,
					select: false
				}
			],
			exchangeList: [],
			// 身份认证弹窗
			showPop: false,
			showAuth: false,
			isBottom: false,
			selectLength: 0,
			bourseLength: 0,
			isAuth: '', //用户是否身份认证
			userId: '', //用户id
			mt4Status: '', //绑定账户状态码
			skeletonStatus: true,
			promotedList: [],
			likeSign: false,
			loading1: false,
			loading3: false,
			isBottom3: false,
			pageNum3: 1,
			pages3: 0,
			toptype: 1,
			sortNum: 1,
			tooggle: 1,
			duration: '',
			changebourseId: 1
		};
	},
	onLoad() {
		console.log(JSON.stringify(this.contractType));

		this.isBottom = false;
		this.pageNum = 1;
	},
	onPullDownRefresh() {
		if (this.activeTab == 0) {
			this.contractType = 2;
			this.init(this.contractType); //获取跟单列表
		} else if (this.activeTab == 1) {
			this.contractType = 1;
			this.init(this.contractType); //获取跟单列表
		} else if (this.activeTab == 2) {
			this.optionlist();
		}
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onShow() {
		//判断设备像素比
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: res => {
				this.pixelRatio = res.pixelRatio;
				if (this.pixelRatio == 3) this.pixelClass = 'triple';
				if (this.pixelRatio == 4) this.pixelClass = 'quadruple';
			}
		});
		// #endif;
		this.token = uni.getStorageSync('token');
		this.userId = uni.getStorageSync('userId');
		this.isAuth = uni.getStorageSync('isAuth');
		this.mt4Status = uni.getStorageSync('mt4Status');
		this.isLogin = this.token != '';
		this.optionlist();
		if (this.activeTab == 0) {
			this.contractType = 2;
			this.init(this.contractType); //获取跟单列表
		} else if (this.activeTab == 1) {
			this.contractType = 1;
			this.init(this.contractType); //获取跟单列表
		}
	},
	onHide() {
		this.likeSign = false;
	},
	onReachBottom() {
		this.isBottom = true;
		if (this.activeTab == 1 || this.activeTab == 2) {
			if (this.pageNum >= this.pages) {
				return;
			}
			this.pageNum++;
			this.init(this.contractType);
		}
		if (this.activeTab == 3) {
			this.isBottom3 = true;
			if (this.pageNum3 >= this.pages3) {
				return;
			}
			this.pageNum3++;
			this.getpromotionTrader();
		}
	},
	methods: {
		gotraders(traderId, bourseName, currencyName, type) {
			uni.navigateTo({
				url: '../traders/traders?traderId=' + traderId + '&bourseName=' + bourseName + '&currencyName=' + currencyName + '&type=' + type
			});
		},
		init(type) {
			console.log(JSON.stringify(type));
			this.loading1 = true;
			this.$Ajax(
				'/front/trader/contract/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					contractType: type,
					type: this.toptype,
					duration: this.duration,
					bourseId: this.changebourseId
				},
				res => {
					if (res.code == 0) {
						this.loading1 = false;
					}
					this.skeletonStatus = false;
					let list = res.obj.obj.list;
					this.pages = res.obj.pages;
					if (type == 2) {
						this.usdtList = list;
					} else if (type == 1) {
						this.numList = list;
					}
					console.log(JSON.stringify('usdt-->' + this.usdtList));
					console.log(JSON.stringify('数字-->' + this.numList));
				}
			);
			// this.loading1 = false;
		},
		// tab
		change(index) {
			// console.log(JSON.stringify(id));
			uni.showTabBar();
			this.isBottom = false;
			if (index == this.activeTab) return;
			this.activeTab = index;
			// this.activeTab = id;
			// if (this.activeTab != 0) {
			// 	this.pageSize = 10;
			// 	this.pageNum = 1;
			// 	this.pages = 0;
			// }
			console.log(JSON.stringify(this.activeTab));
			if (this.activeTab == 0) {
				this.contractType = 2;
				this.init(this.contractType);
			} else if (this.activeTab == 1) {
				this.contractType = 1;
				this.init(this.contractType);
			} else if (this.activeTab == 2) {
				this.optionlist();
			}
		},
		//获取币种
		optionlist() {
			this.$Ajax(
				'/front/trader/options/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.toptype,
					duration: this.duration
				},
				res => {
					console.log(JSON.stringify(res));
					this.pages = res.obj.obj.pages;
					this.optionlists = res.obj.obj.list;
					console.log(JSON.stringify(this.optionlists));
				}
			);
		},
		getCurrency(type) {
			this.$Ajax(
				'/community/getContractName',
				{
					currencyType: type
				},
				res => {
					let list = res.obj;
					list.forEach((item, idx) => {
						item.select = false;
						item.name = item.currencyName;
					});
					this.currencyList = list;
				}
			);
		},
		//获取交易所
		getBourse() {
			this.$Ajax('/front/bourse/get/list', {}, res => {
				let list = res.obj;
				list.forEach((item, idx) => {
					item.select = false;
					item.name = item.code;
				});
				this.exchangeList = list;
				console.log(JSON.stringify(this.exchangeList));
			});
		},
		// 数字筛选
		numSelect(id) {
			const that = this;
			this.$tools.handleChange(that.numSelectList, id, false, (data, res) => {
				this.activeInnerTab = res[0];
				that.numSelectList = data;
			});
			if (this.numSelectList[0].select || this.numSelectList[1].select) {
				this.getBourse();
				uni.hideTabBar();
			} else {
				uni.showTabBar();
			}
			if (this.selectLength == 0 && this.bourseLength == 0) {
				this.selectCancel();
				this.tradeCancel();
			}
		},
		//隐藏筛选
		hideSelect() {
			this.showSelect = false;
			this.numSelectList.forEach((item, i) => {
				item.select = false;
			});
			uni.showTabBar();
		},
		//币种筛选
		currencySelect(id) {
			const that = this;
			this.$tools.handleChange(that.currencyList, id, true, (data, res) => {
				this.currencyNameId = res;
				// console.log(this.currencyNameId);
				that.currencyList = data;
			});
		},
		//交易员筛选
		traderSelect(id) {
			const that = this;
			this.$tools.handleChange(that.traderList, id, true, (data, res) => {
				this.userLever = res;
				that.traderList = data;
			});
		},
		//入驻时长筛选
		enterSelect(id) {
			const that = this;
			console.log(JSON.stringify(id, '時長ID'));
			this.$tools.handleChange(that.enterList, id, false, (data, res) => {
				console.log(res, '時長確定');
				this.timeQueryType = res;
				that.enterList = data;
			});
			this.duration = id;
		},
		//筛选重置
		selectCancel() {
			this.currencyList.forEach((item, i) => {
				item.select = false;
			});
			this.traderList.forEach((item, i) => {
				item.select = false;
			});
			this.enterList.forEach((item, i) => {
				item.select = false;
			});
			this.currencyNameId = [];
			this.userLever = [];
			this.timeQueryType = [];
			this.selectLength = 0;
			this.duration = '';
		},
		//确定筛选
		selectConfirm() {
			if (this.activeTab != 2) {
				this.showSelect = false;
				this.numSelectList.forEach((item, i) => {
					item.select = false;
				});
				uni.showTabBar();
				this.selectLength = this.userLever.length + this.currencyNameId.length + this.timeQueryType.length;
				this.isBottom = false;
				this.pageNum = 1;
				this.pageSize = 10;
				this.init(this.contractType);
			} else {
				console.log('期權相關');
				this.showSelect = false;
				this.numSelectList[0].select = false;
				this.optionlist();
			}
		},
		//交易所筛选
		exchangeSelect(id) {
			const that = this;
			// console.log(JSON.stringify(that.exchangeList));
			this.$tools.handleChange(that.exchangeList, id, false, (data, res) => {
				this.bourseId = res;
				that.exchangeList = data;
			});
			console.log(this.bourseId[0]);
			this.changebourseId = this.bourseId[0];
		},
		//交易所重置
		tradeCancel() {
			this.exchangeList.forEach((item, i) => {
				item.select = false;
			});
			this.bourseId = [];
			this.bourseLength = 0;
			this.changebourseId = '';
		},
		//确定交易所
		tradeConfirm() {
			this.showSelect = false;
			this.numSelectList.forEach((item, i) => {
				item.select = false;
			});
			uni.showTabBar();
			this.bourseLength = this.bourseId.length;
			this.isBottom = false;
			this.pageNum = 1;
			this.pageSize = 10;
			this.init(this.contractType);
		},
		search() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		goNumber() {
			this.init(1);
			this.activeTab = 1;
		},
		goUsdt() {
			this.init(2);
			this.activeTab = 2;
		},
		// 智能量化
		intelligent() {
			if (!this.isLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
				return;
			}
			uni.navigateTo({
				url: '../intelligent/intelligent'
			});
		},
		// 绑定账户
		binding() {
			if (!this.isLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
				return;
			}
			if (!this.isAuth) {
				//身份认证
				uni.hideTabBar();
				return (this.showPop = true);
			}
			uni.navigateTo({
				url: '../bindingAC/bindingAC'
			});
		},
		// 跟单榜
		follow() {
			uni.navigateTo({
				url: '../followDetails/followDetails'
			});
		},
		clickoptionfollow(userImage, userName, currencyName, traderId, following) {
			uni.navigateTo({
				url:
					'../optionfollowpage/optionfollowpage?userImage=' +
					userImage +
					'&userName=' +
					userName +
					'&currencyName=' +
					currencyName +
					'&traderId=' +
					traderId +
					'&following=' +
					following
			});
		},
		//禁止滑动
		moveHandle() {},
		// 点击跟单交易员
		clickfollow(num, userId, userImage, userName, currencyName) {
			if (!this.isLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
				return;
			}
			if (this.userId == userId) {
				return this.$tools.toast('不能跟单自己');
			}
			if (!this.isAuth) {
				//身份认证
				uni.hideTabBar();
				return (this.showPop = true);
			}
			let url = '';
			url = '../followpage/followpage?tradeId=' + userId + '&userImage=' + userImage + '&userName=' + userName + '&currencyName=' + currencyName;
			// else url = '../modifyfollow/modifyfollow?tradeId=' + userId + '&userImage=' + userImage + '&userName=' + userName + '&currencyName=' + currencyName;
			uni.navigateTo({
				url: url
			});
		},
		//跟单交易员弹窗认证
		//去认证
		confirm() {
			uni.showTabBar();
			this.showPop = false;
			uni.navigateTo({
				url: '../attestation/attestation'
			});
		},
		close() {
			uni.showTabBar();
			this.showPop = false;
		},
		confirmAuth() {
			uni.showTabBar();
			this.showAuth = false;
			uni.navigateTo({
				url: '../bindingAC/bindingAC'
			});
		},
		closeAuth() {
			uni.showTabBar();
			this.showAuth = false;
		},
		//查看个人首页
		// jumptraders(userId, currencyName, bourseId, contractType) {
		// 	// if(!this.isLogin) {
		// 	// 	uni.navigateTo({
		// 	// 		url: '../login/login'
		// 	// 	})
		// 	// 	return;
		// 	// }
		// 	// #ifdef APP-PLUS
		// 	const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
		// 	dcRichAlert.show(
		// 		{
		// 			title: '1',
		// 			currencyName: currencyName,
		// 			myuserId: this.userId,
		// 			userId: userId,
		// 			token: uni.getStorageSync('token'),
		// 			isAuth: uni.getStorageSync('isAuth'),
		// 			mt4Status: uni.getStorageSync('mt4Status')
		// 		},
		// 		result => {
		// 			if (result.type == 1) {
		// 				uni.navigateTo({
		// 					url: '../login/login'
		// 				});
		// 			}
		// 			if (result.type == 2) {
		// 				uni.setStorageSync('token', result.token);
		// 				uni.setStorageSync('phone', result.phone);
		// 				uni.setStorageSync('userId', result.uid);
		// 				if (result.mt4Status == 0) {
		// 					uni.setStorageSync('isAC', true);
		// 					uni.setStorageSync('mt4Status', 0);
		// 				} else if (result.mt4Status == 1) {
		// 					uni.setStorageSync('isAC', false);
		// 					uni.setStorageSync('mt4Status', 1);
		// 				} else {
		// 					uni.setStorageSync('isAC', false);
		// 					uni.setStorageSync('mt4Status', 2);
		// 				}
		// 				// 身份验证
		// 				if (result.authStatus == 2) {
		// 					uni.setStorageSync('isAuth', true);
		// 				} else {
		// 					uni.setStorageSync('isAuth', false);
		// 				}
		// 			}
		// 		}
		// 	);
		// 	// #endif
		// 	// uni.navigateTo({
		// 	// 	url:'../traders/traders?userId='+userId+'&currencyName='+currencyName+'&bourseId='+bourseId+'&contractType='+contractType
		// 	// })
		// },
		sortNumSelect(type) {
			if (this.sortNum == type) {
				if (this.tooggle == 1) {
					this.tooggle = 2;
				} else {
					this.tooggle = 1;
				}
			} else {
				this.sortNum = type;
				this.tooggle = 1;
			}
			console.log(JSON.stringify(this.sortNum, '!@#$%'));
			console.log(JSON.stringify(this.tooggle, '!@#$%'));
			if (this.sortNum == 1 && this.tooggle == 1) {
				this.toptype = 1;
			} else if (this.sortNum == 2 && this.tooggle == 1) {
				this.toptype = 3;
			} else if (this.sortNum == 3 && this.tooggle == 1) {
				this.toptype = 5;
			} else if (this.sortNum == 1 && this.tooggle == 2) {
				this.toptype = 2;
			} else if (this.sortNum == 2 && this.tooggle == 2) {
				this.toptype = 4;
			} else if (this.sortNum == 3 && this.tooggle == 2) {
				this.toptype = 6;
			}
			// this.toptype = this.tooggle;

			this.isBottom = false;
			this.pageNum = 1;
			this.pageSize = 10;
			if (this.activeTab == 0 || this.activeTab == 1) {
				this.init(this.contractType); //获取跟单列表
			} else if (this.activeTab == 2) {
				this.optionlist();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@keyframes rotation {
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
	}
}
$black: #2f3033;
.content {
	height: 100%;
	.top_view {
		z-index: 1000;
		background: #ffffff;
	}
	.header {
		width: 100%;
		height: 92upx;
		padding-right: 18upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		position: fixed;
		z-index: 1000;
		.tabBox {
			padding-left: 36upx;
			display: flex;
			justify-content: flex-start;
			box-sizing: border-box;
			.tab {
				margin-right: 60upx;
				font-size: 28upx;
				color: #797c84;
				line-height: 92upx;
			}
			.active {
				color: $black;
				font-size: 36upx;
				font-weight: bold;
			}
		}
		.search {
			height: 92upx;
			padding: 24upx 18upx;
			box-sizing: border-box;
			image {
				width: 48upx;
				height: 48upx;
			}
		}
	}
	.body {
		height: 100%;
		padding-top: 92upx;
		.followBox {
			background-color: #fff;

			.banner {
				padding: 30upx;
				background-color: #ffffff;
				image {
					width: 100%;
				}
			}

			.scroll-view_H {
				white-space: nowrap;
				padding: 24upx 0 32upx 0;
				.itemBox {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.item {
					margin-right: 40px;
					line-height: 300upx;
					text-align: center;
					font-size: 36upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					image {
						width: 100upx;
						height: 100upx;
						margin-right: 10px;
					}
					.msg {
						text-align: left;
						font-size: 28upx;
						color: $black;
						line-height: 44upx;
						view {
							font-size: 20upx;
							color: #797c84;
							line-height: 28upx;
						}
					}
				}
				.item:first-child {
					margin-left: 32upx;
				}
				.item:last-child {
					padding-right: 32upx;
				}
			}
			.listBox {
				background: #f6f7f8;
				padding: 0 26upx;
				.tit {
					height: 104upx;
					font-size: 28upx;
					padding-left: 3upx;
					padding-right: 9px;
					color: $black;
					font-weight: bold;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.more {
						font-size: 24upx;
						color: #797c84;
						display: flex;
						align-items: center;
						image {
							width: 16upx;
							height: 16upx;
							margin-left: 3px;
						}
					}
				}
				.skeleton {
					width: 100%;
					height: 244upx;
					display: block;
				}
				.skeleton-t {
					margin-top: 26upx;
				}
				.list {
					display: inline-block;
					width: 100%;
					height: 250upx;
					padding: 28upx 36upx 36upx 36upx;
					margin-bottom: 26upx;
					box-sizing: border-box;
					position: relative;
					background: #fff;
					border-radius: 12upx;
					position: relative;
					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.left {
							width: 70%;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.img {
								width: 80upx;
								height: 80upx;
								position: relative;
								.userPic {
									width: 80upx;
									height: 80upx;
									border-radius: 50%;
									overflow: hidden;
								}
								.currency {
									position: absolute;
									bottom: -2px;
									right: -2px;
									width: 36upx;
									height: 36upx;
									border-radius: 50%;
									overflow: hidden;
								}
							}
							.user {
								width: 300upx;
								margin-left: 8px;
								.name {
									color: $black;
									display: flex;
									// align-items: center;
									.title {
										font-size: 28upx;
										line-height: 44upx;
										max-width: 100px;
									}
									image {
										width: 108upx;
										height: 40upx;
										display: block;
										margin-left: 4upx;
									}
								}
								.strategy-list {
									display: flex;
									// justify-content: space-between;
								}
								.type {
									font-size: 20upx;
									line-height: 28upx;
									color: #797c84;
								}
							}
						}
						.btn {
							width: 96upx;
							height: 56upx;
							line-height: 56upx;
							text-align: center;
							background: #f7f8fa;
							border-radius: 8upx;
							font-size: 24upx;
							color: #2989fd;
						}
						.btn.active {
							color: #b2b6be;
						}
					}
					.foot {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 32upx;
						.middle {
							position: absolute;
							left: 280upx;
							// flex: 1;
							// padding-left: 0upx;

							// display: flex;
							// flex-direction: column;
							// align-items: center;
						}
						.num {
							font-family: DIN;
							font-size: 36upx;
							color: $black;
							line-height: 44upx;
							margin-bottom: 2px;
						}
						.yield {
							color: #08a91b;
						}
						.loss {
							color: #e9695e !important;
						}
						.msg {
							font-size: 20upx;
							color: #797c84;
							line-height: 28upx;
						}
					}
				}
			}
		}
		.number {
			height: 100%;
			.select {
				width: 100%;
				position: fixed;
				z-index: 1000;
				box-sizing: border-box;
				padding: 0upx 32upx 0 36upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				height: 88rpx;
				.left {
					height: 100%;
					display: flex;
					view {
						display: flex;
						align-items: center;
					}
					.mg-r {
						margin-right: 40rpx;
					}
					.num {
						color: #797c84;
						font-size: 24upx;
						line-height: 34upx;
						margin-right: 8upx;
					}
					.active {
						font-weight: bold;
						color: #2989fd;
					}
					.img {
						display: flex;
						flex-direction: column;
						image {
							width: 12upx;
							height: 12upx;
							display: block;
						}
						.top {
							margin-top: 2upx;
						}
					}
				}
				.right {
					display: flex;
					.tab {
						height: 58upx;
						padding: 0 16upx;
						font-size: 24upx;
						color: #797c84;
						line-height: 58upx;
						text-align: center;
						margin-right: 8px;
					}
					.tab:after {
						border-radius: 12upx;
					}
					.active {
						color: #2989fd;
					}
					.active:after {
						border-color: #2989fd;
						border-radius: 12upx;
					}
					.isBourse,
					.isSelect {
						background: #2989fd;
						color: #fff;
						border-radius: 6upx;
						&::after {
							border: none !important;
						}
					}
				}
			}
			.listBox {
				// height: calc(100% - 120upx);
				padding-top: 120upx;
				background: #f6f7f8;
				.noData {
					// height: 100%;
					background: #fff;
					// margin-top: -40upx;
					padding: 0 30upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28upx;
					color: #b2b6be;
					// margin-top: 100px;
					image {
						width: 100upx;
						height: 100upx;
					}
				}
				.inner {
					margin: 0 26upx;
					.list {
						display: inline-block;
						width: 100%;
						// height: 250upx;
						margin-bottom: 26upx;
						padding: 28upx 36upx 36upx 36upx;
						box-sizing: border-box;
						position: relative;
						background: #fff;
						border-radius: 12upx;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						.top-item {
							display: flex;
							align-items: center;
							height: 60upx;
							margin-bottom: 1%;
							justify-content: space-between;
							.topOrientation {
								display: flex;
								width: 300upx;
								height: 36upx;
								align-items: center;
								.sameOrientation {
									width: 138upx;
									height: 36upx;
									line-height: 36upx;
									color: #ffffff;
									text-align: center;
									font-size: 20upx;
									background-position: center;
									background-size: 100% 100%;
								}
								.reserveOrientation {
									width: 156upx;
									height: 36upx;
									line-height: 36upx;
									color: #ffffff;
									text-align: center;
									font-size: 20upx;
									background-position: center;
									background-size: 100% 100%;
									position: absolute;
									left: 20.5%;
								}
							}
							.bourse-name {
								color: #f2bc24;
								width: 150upx;
								image {
									width: 100%;
								}
							}
						}

						.top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.left {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								.img {
									width: 80upx;
									height: 80upx;
									position: relative;
									.userPic {
										width: 80upx;
										height: 80upx;
										border-radius: 50%;
										overflow: hidden;
									}
									.currency {
										position: absolute;
										bottom: -2px;
										right: -2px;
										width: 36upx;
										height: 36upx;
										border-radius: 50%;
										overflow: hidden;
									}
								}
								.user {
									margin-left: 8px;
									.name {
										color: $black;
										display: flex;
										.tit {
											font-size: 28upx;
											line-height: 44upx;
											max-width: 100px;
										}
										// align-items: center;
										image {
											width: 108upx;
											height: 40upx;
											display: block;
											margin-left: 4upx;
										}
									}
									.strategy-list {
										display: flex;
										// justify-content: space-between;
									}
									.type {
										font-size: 20upx;
										line-height: 28upx;
										color: #797c84;
									}
								}
							}
							.btn {
								width: 96upx;
								height: 56upx;
								line-height: 56upx;
								text-align: center;
								background: #f7f8fa;
								border-radius: 8upx;
								font-size: 24upx;
								color: #2989fd;
							}
							.btn.active {
								color: #797c84;
							}
							.btn.active:after {
								border-color: #797c84;
							}
							.btn:after {
								border-radius: 2px;
								border-color: #2989fd;
							}
						}
						.foot {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 32upx;
							.num {
								font-family: DIN;
								font-size: 36upx;
								color: $black;
								line-height: 44upx;
								margin-bottom: 2px;
							}
							.yield {
								color: #08a91b;
							}
							.loss {
								color: #e9695e !important;
							}
							.msg {
								font-size: 20upx;
								color: #797c84;
								line-height: 28upx;
							}
						}
					}
					.loading {
						height: 100upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image {
							width: 44upx;
							height: 44upx;
							margin-bottom: 10upx;
							animation: rotation 0.5s linear infinite;
						}
					}
				}
			}
		}
		.usdt {
			height: 100%;
			.select {
				width: 100%;
				position: fixed;
				z-index: 1000;
				box-sizing: border-box;
				padding: 0upx 32upx 0 36upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				height: 88rpx;
				.left {
					height: 100%;
					display: flex;
					view {
						display: flex;
						align-items: center;
					}
					.mg-r {
						margin-right: 40rpx;
					}
					.num {
						color: #797c84;
						font-size: 24upx;
						line-height: 34upx;
						margin-right: 8upx;
					}
					.active {
						font-weight: bold;
						color: #2989fd;
					}
					.img {
						display: flex;
						flex-direction: column;
						image {
							width: 12upx;
							height: 12upx;
							display: block;
						}
						.top {
							margin-top: 2upx;
						}
					}
				}
				.right {
					display: flex;
					.tab {
						height: 58upx;
						padding: 0 16upx;
						font-size: 24upx;
						color: #797c84;
						line-height: 58upx;
						text-align: center;
						margin-right: 8px;
					}
					.tab:after {
						border-radius: 12upx;
					}
					.active {
						color: #2989fd;
					}
					.active:after {
						border-color: #2989fd;
						border-radius: 12upx;
					}
					.isBourse,
					.isSelect {
						background: #2989fd;
						color: #fff;
						border-radius: 6upx;
						&::after {
							border: none !important;
						}
					}
				}
			}
			.listBox {
				// height: calc(100% - 120upx);
				background: #f6f7f8;
				padding-top: 120upx;
				.noData {
					// height: 100%;
					background: #fff;
					// margin-top: -30upx;
					padding: 0 30upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28upx;
					color: #b2b6be;
					// margin-top: 100px;
					image {
						width: 100upx;
						height: 100upx;
					}
				}
				.inner {
					margin: 0 26upx;
					// background: #FFFFFF;
					.list {
						display: inline-block;
						width: 100%;
						// height: 250upx;
						margin-bottom: 26upx;
						padding: 28upx 36upx 36upx 36upx;
						box-sizing: border-box;
						position: relative;
						background: #fff;
						border-radius: 12upx;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						.top-item {
							display: flex;
							align-items: center;
							height: 60upx;
							margin-bottom: 1%;
							justify-content: space-between;
							.topOrientation {
								width: 300upx;
								display: flex;
								height: 36upx;
								align-items: center;
								.sameOrientation {
									width: 138upx;
									height: 36upx;
									line-height: 36upx;
									color: #ffffff;
									text-align: center;
									font-size: 20upx;
									background-position: center;
									background-size: 100% 100%;
								}
								.reserveOrientation {
									width: 156upx;
									height: 36upx;
									line-height: 36upx;
									color: #ffffff;
									text-align: center;
									font-size: 20upx;
									background-position: center;
									background-size: 100% 100%;
									position: absolute;
									left: 20.5%;
								}
							}
							.bourse-name {
								color: #f2bc24;
								width: 150upx;
								image {
									width: 100%;
								}
							}
						}
						.top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.left {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								.img {
									width: 80upx;
									height: 80upx;
									position: relative;
									.userPic {
										width: 80upx;
										height: 80upx;
										border-radius: 50%;
										overflow: hidden;
									}
									.currency {
										position: absolute;
										bottom: -2px;
										right: -2px;
										width: 36upx;
										height: 36upx;
										border-radius: 50%;
										overflow: hidden;
									}
								}
								.user {
									margin-left: 8px;
									.name {
										color: $black;
										display: flex;
										.tit {
											font-size: 28upx;
											line-height: 44upx;
											max-width: 100px;
										}
										// align-items: center;
										image {
											width: 108upx;
											height: 40upx;
											display: block;
											margin-left: 4upx;
										}
									}
									.strategy-list {
										display: flex;
										// justify-content: space-between;
									}
									.type {
										font-size: 20upx;
										line-height: 28upx;
										color: #797c84;
									}
								}
							}
							.btn {
								width: 96upx;
								height: 56upx;
								line-height: 56upx;
								text-align: center;
								background: #f7f8fa;
								border-radius: 8upx;
								font-size: 24upx;
								color: #2989fd;
							}
							.btn.active {
								color: #797c84;
							}
							.btn.active:after {
								border-color: #797c84;
							}
							.btn:after {
								border-radius: 2px;
								border-color: #2989fd;
							}
						}
						.foot {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 32upx;
							.num {
								font-family: DIN;
								font-size: 36upx;
								color: $black;
								line-height: 44upx;
								margin-bottom: 2px;
							}
							.yield {
								color: #08a91b;
							}
							.loss {
								color: #e9695e !important;
							}
							.msg {
								font-size: 20upx;
								color: #797c84;
								line-height: 28upx;
							}
						}
					}
					.loading {
						height: 100upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image {
							width: 44upx;
							height: 44upx;
							margin-bottom: 10upx;
							animation: rotation 0.5 linear infinite;
						}
					}
				}
			}
		}
		.promoted {
			height: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			// padding-top: 40upx;
			.select {
				width: 100%;
				position: fixed;
				z-index: 1000;
				box-sizing: border-box;
				padding: 0upx 32upx 0 36upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				height: 88rpx;
				.left {
					height: 100%;
					display: flex;
					view {
						display: flex;
						align-items: center;
					}
					.mg-r {
						margin-right: 40rpx;
					}
					.num {
						color: #797c84;
						font-size: 24upx;
						line-height: 34upx;
						margin-right: 8upx;
					}
					.active {
						font-weight: bold;
						color: #2989fd;
					}
					.img {
						display: flex;
						flex-direction: column;
						image {
							width: 12upx;
							height: 12upx;
							display: block;
						}
						.top {
							margin-top: 2upx;
						}
					}
				}
				.right {
					display: flex;
					.tab {
						height: 58upx;
						padding: 0 16upx;
						font-size: 24upx;
						color: #797c84;
						line-height: 58upx;
						text-align: center;
						margin-right: 8px;
					}
					.tab:after {
						border-radius: 12upx;
					}
					.active {
						color: #2989fd;
					}
					.active:after {
						border-color: #2989fd;
						border-radius: 12upx;
					}
					.isBourse,
					.isSelect {
						background: #2989fd;
						color: #fff;
						border-radius: 6upx;
						&::after {
							border: none !important;
						}
					}
				}
			}
			.listBox {
				// height: calc(100% - 120upx);
				padding-top: 120upx;
				background: #f6f7f8;
				.noData {
					// height: 100%;
					background: #fff;
					// margin-top: -40upx;
					padding: 0 30upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28upx;
					color: #b2b6be;
					// margin-top: 100px;
					image {
						width: 100upx;
						height: 100upx;
					}
				}
				.inner {
					margin: 0 26upx;
					.list {
						display: inline-block;
						width: 100%;
						// height: 250upx;
						margin-bottom: 26upx;
						padding: 28upx 36upx 36upx 36upx;
						box-sizing: border-box;
						position: relative;
						background: #fff;
						border-radius: 12upx;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						.top-item {
							display: flex;
							align-items: center;
							height: 60upx;
							margin-bottom: 1%;
							justify-content: space-between;
							.topOrientation {
								width: 300upx;
								display: flex;
								height: 36upx;
								align-items: center;
								.sameOrientation {
									width: 138upx;
									height: 36upx;
									line-height: 36upx;
									color: #ffffff;
									text-align: center;
									font-size: 20upx;
									background-position: center;
									background-size: 100% 100%;
								}
								.reserveOrientation {
									width: 156upx;
									height: 36upx;
									line-height: 36upx;
									color: #ffffff;
									text-align: center;
									font-size: 20upx;
									background-position: center;
									background-size: 100% 100%;
									position: absolute;
									left: 20.5%;
								}
							}
							.bourse-name {
								color: #f2bc24;
								width: 150upx;
								image {
									width: 100%;
								}
							}
						}
						.top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.left {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								.img {
									width: 80upx;
									height: 80upx;
									position: relative;
									.userPic {
										width: 80upx;
										height: 80upx;
										border-radius: 50%;
										overflow: hidden;
									}
									.currency {
										position: absolute;
										bottom: -2px;
										right: -2px;
										width: 36upx;
										height: 36upx;
										border-radius: 50%;
										overflow: hidden;
									}
								}
								.user {
									margin-left: 8px;
									.name {
										color: $black;
										display: flex;
										.tit {
											font-size: 28upx;
											line-height: 44upx;
											max-width: 100px;
										}
										// align-items: center;
										image {
											width: 108upx;
											height: 40upx;
											display: block;
											margin-left: 4upx;
										}
									}
									.strategy-list {
										display: flex;
										// justify-content: space-between;
									}
									.type {
										font-size: 20upx;
										line-height: 28upx;
										color: #797c84;
									}
								}
							}
							.btn {
								width: 96upx;
								height: 56upx;
								line-height: 56upx;
								text-align: center;
								background: #f7f8fa;
								border-radius: 8upx;
								font-size: 24upx;
								color: #2989fd;
							}
							.btn.active {
								color: #797c84;
							}
							.btn.active:after {
								border-color: #797c84;
							}
							.btn:after {
								border-radius: 2px;
								border-color: #2989fd;
							}
						}
						.foot {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 32upx;
							.num {
								font-family: DIN;
								font-size: 36upx;
								color: $black;
								line-height: 44upx;
								margin-bottom: 2px;
							}
							.yield {
								color: #08a91b;
							}
							.loss {
								color: #e9695e !important;
							}
							.msg {
								font-size: 20upx;
								color: #797c84;
								line-height: 28upx;
							}
						}
					}
					.loading {
						height: 100upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image {
							width: 44upx;
							height: 44upx;
							margin-bottom: 10upx;
							animation: rotation 0.5s linear infinite;
						}
					}
				}
			}
			.banner {
				padding: 30upx;
				image {
					width: 100%;
				}
				// width: 698upx;
				// height: 174upx;
				// border-radius: 8upx;
				// margin: 0 26upx;
			}
			.even {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30upx;
				.left {
					.title {
						font-size: 32upx;
						font-weight: bold;
						color: #2f3033;
						line-height: 44upx;
						box-sizing: border-box;
						padding-left: 32upx;
					}
					.describe {
						font-size: 24upx;
						color: #797c84;
						line-height: 34upx;
						margin-top: 4upx;
						box-sizing: border-box;
						padding-left: 32upx;
					}
				}
				.more {
					font-size: 24upx;
					color: #797c84;
					margin-right: 26upx;
					color: #2989fd;
					font-weight: bold;
					display: flex;
					align-items: center;
					image {
						width: 12upx;
						margin-left: 3px;
					}
				}
			}
		}
	}
	.selectBox {
		// .uni-mask {
		// 	background: transparent;
		// }
		.dorpDown1 {
			position: fixed;
			top: 170upx;
			left: 0;
			z-index: 1000;
			background: #fff;
			width: 100%;
			padding-top: 32upx;
			box-sizing: border-box;
			margin-top: var(--status-bar-height);
			.currency,
			.trader,
			.enter {
				.tit {
					font-size: 28upx;
					color: $black;
					line-height: 40upx;
					padding: 0 36upx;
				}
				.listBox {
					width: 100%;
					box-sizing: border-box;
					padding-left: 5%;
					display: flex;
					flex-wrap: wrap;
					view {
						width: 20%;
						margin-top: 10px;
						margin-right: 5%;
						font-size: 24upx;
						line-height: 72upx;
						background: #f1f2f4;
						border-radius: 8upx;
						text-align: center;
					}
					view:after {
						border-radius: 8upx;
						border-color: #f1f2f4;
					}
					.active {
						background: #fff;
						color: #2989fd;
					}
					.active:after {
						border-color: #2989fd;
					}
				}
			}
			.currency,
			.trader {
				.listBox {
					margin-bottom: 30px;
				}
			}
			.btnBox {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 24px;
				view {
					width: 50%;
					line-height: 88upx;
					font-size: 32upx;
					color: $black;
					text-align: center;
					background: #f7f8fa;
				}
				.confirm {
					color: #fff;
					background: #2989fd;
				}
			}
		}
		.dorpDown2 {
			position: fixed;
			top: 170upx;
			left: 0;
			z-index: 1000;
			background: #fff;
			width: 100%;
			padding-top: 32upx;
			box-sizing: border-box;
			margin-top: var(--status-bar-height);
			.exchange {
				.tit {
					font-size: 28upx;
					color: $black;
					line-height: 40upx;
					padding: 0 36upx;
				}
				.listBox {
					width: 100%;
					box-sizing: border-box;
					padding-left: 5%;
					display: flex;
					flex-wrap: wrap;
					view {
						width: 20%;
						margin-top: 10px;
						margin-right: 5%;
						font-size: 24upx;
						line-height: 72upx;
						background: #f1f2f4;
						border-radius: 4px;
						text-align: center;
					}
					view:after {
						border-radius: 8upx;
						border-color: #f1f2f4;
					}
					.active {
						background: #fff;
						color: #2989fd;
					}
					.active:after {
						border-color: #2989fd;
					}
				}
			}
			.btnBox {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 24px;
				view {
					width: 50%;
					line-height: 88upx;
					font-size: 32upx;
					color: $black;
					text-align: center;
					background: #f7f8fa;
				}
				.confirm {
					color: #fff;
					background: #2989fd;
				}
			}
		}
	}
}
</style>
