<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title"></view>
			<view class="header-empty"></view>
		</view>
		<view class="page-title-cn">{{ i18n.login.register_title }}</view>
		<view class="fill-plate">
			<view class="input-plate">
				<view class="input-title">{{ i18n.login.Identity_name }}</view>
				<view class="input-flex">
					<input type="text" v-model="phoneEmail" value="" :placeholder="i18n.login.enter_02" />
					<view class="flex-right-pic" v-if="clearStatus" @click="clear()">
						<image src="../../static/login/clear-icon.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="input-plate">
				<view class="input-title">{{ i18n.login.Wallet_password }}</view>
				<view class="input-flex">
					<input :password="!eyeShowHideArray[0].show" v-model="password" value="" :placeholder="i18n.login.enter_03" />
					<view class="flex-right-pic" @click="changeShow(0)">
						<image v-if="eyeShowHideArray[0].show" src="../../static/login/open-eye.png" mode=""></image>
						<image v-else src="../../static/login/close-eye.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="input-plate">
				<view class="input-title">{{ i18n.login.confirPwd }}</view>
				<view class="input-flex">
					<input :password="!eyeShowHideArray[1].show" v-model="confirmpassword" value="" :placeholder="i18n.login.enter_04" />
					<view class="flex-right-pic" @click="changeShow(1)">
						<image v-if="eyeShowHideArray[1].show" src="../../static/login/open-eye.png" mode=""></image>
						<image v-else src="../../static/login/close-eye.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="input-plate">
				<view class="input-title">{{ i18n.login.Invitation_code }}</view>
				<view class="input-flex">
					<input type="text" v-model="code" value="" :placeholder="i18n.login.enter_06" />
				</view>
			</view>
			<view class="input-agreement">
				<label :class="[isActive ? 'checkbox-active' : '']" @click="agreement()">
					<view class="checkbox" ></view>
				</label>
				<view class="input-agreement-title">{{ i18n.login.tips_01 }}</view>
				<view class="input-agreement-name" @click="openPopup('popup')">{{ i18n.login.tips_02 }}</view>
			</view>
			<view class="btn" @click="next()">{{ i18n.login.btn_01 }}</view>
		</view>
		
		<!-- 弹出层 -->
		<view id="popup" ref="popup" type="center" :animation="false" @change="changePopup" v-if="toastStatus">
			<view class="oppupBox">
				<view class="oppupBox-wrapper">
					<view class="oppupBox-wrapper__header">{{ langType == 'en' ? 'Spayx service agreement' : '《SpayX服务协议》'}}</view>
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="oppupBox-wrapper__content">
						<view v-if="langType == 'cn'">
						尊敬的用户：
						<br>感谢您选择SPAYX服务。《SPAYX服务协议》（以下简称“本协议”），用户（以下简称“您”或“用户”）签订，本协议在您与本公司之间具有合同上的法律效力。
						<br>在此特别提醒您在使用SPAYX（以下简称“SPAYX”或本软件，SPAYX可在各移动应用平台上下载，包括但不仅限于Google Play和App Store）之前，请认真阅读《SPAYX服务协议》及后文提到的相关协议，尤其是本协议规定的“免责及责任限制”等条款将以加粗的形式体现，确保您充分理解本协议中各条款，并自主考虑风险。
						<br>一、 关于本协议的确认与接纳
						<br>1) 您理解本协议及有关协议适用于SPAYX及SPAYX上本公司所自主开发和拥有的去中心化应用（简称“DApp”）。
						<br>2) 您下载SPAYX软件并创建或导入钱包，即视为您已经充分阅读并接受本协议全部条款，本协议立即生效，对双方具有约束力。
						<br>3) 本协议可由本公司随时更新，经修改的协议一经在SPAYX上公布，立即自动生效，恕不再另行通知。如果您不接受修改后的条款，请立即停止使用SPAYX，您继续使用SPAYX将被视为接受修改后的协议。
						<br>4) 如果您未满18周岁，或者是无民事行为能力人或限制民事行为能力人，请在父母或监护人指导下使用SPAYX。
						<br>二、 定义
						<br>1）用户：
						     <br>A. 用户必须是具备完全民事行为能力的自然人；
						     <br>B. 若您为18周岁以下的未成年人使用SPAYX服务，需要在您父母或监护人的指导下使用SPAYX。无民事行为能力人使用SPAYX或限制民事行为能力人超过其民事权利或行为能力范围从事交易的，造成的一切后果，SPAYX有权要求您及您的父母或监护人负责。
						<br>3）被排出人士：
						     <br>A.除了自然人以外的、具备订立本协议的法律和意识能力的人士
						     <br>B.因本协议、法律、监管要求或适用于该用户的司法管辖区的规定而被以任何形式或方式（全部或部分）禁止、限制、无授权或无资格使用服务（如本协议所定义）的用户。为免疑义，中国用户亦涵盖在“被排除人士”的定义内。
						<br>4）使用相关：
						     <br>A. 创建或导入钱包：指您使用SPAYX，确认履行本协议并创建或导入钱包的过程。
						     <br>B. 钱包密码：指您在创建SPAYX钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或本公司的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。
						<br>信息提示：SPAYX软件操作界面涉及的信息提示内容，建议用户按照相关步骤进行操作。
						     <br>C. 特定用户：指按照新加坡法律法规及政策规定必须要配合本公司履行个人信息披露义务的用户。
						     <br>D. 私钥：由256位随机字符构成，是用户拥有并使用数字代币的核心。
						     <br>E. 公钥：由私钥借助密码学原理单向推导生成，并用以生成区块链数字钱包地址，数字钱包地址即为公开收款地址。
						     <br>F. 助记词：符合区块链BIP39 行业标准，由随机算法生成的12（或15/18/21/24）个有序单词组成。是私钥的易记录表现形式，方便用户备份保管。
						     <br>G. Keystore: 是私钥或助记词经过用户设置的钱包密码加密保存的文件形式，它只存储在您的这台移动设备中，不会同步至本公司服务器。
						     <br>H. 数字代币：指SPAYX目前支持的数字代币种类，包括但不限于ETH、EOS等。
						     <br>I. 资料：指SPAYX上“快讯”等内容资料，这些资料均为本公司所有，未经授权不得转载。
						     <br>K. 中国：指中华人民共和国，包括香港特别行政区、澳门特别行政区、台湾地区。
						<br>三、 您的权利义务
						<br>1) 创建或导入钱包
						     <br>A. 创建或导入钱包：您有权在您的移动设备上通过SPAYX创建和/或导入钱包，有权设定钱包的钱包密码等信息，并有权通过SPAYX应用程序，使用自己的钱包在区块链上进行转账和收款等交易。
						   址、Token地址等。
						     <br>B. 您知悉SPAYX仅向您提供转账工具，在您使用SPAYX完成转账后，本公司即完成了当次服务的所有义务，本公司对其他纠纷争议，不负担任何义务。
						     <br>C. 合法合规。您知悉在SPAYX进行操作时或利用SPAYX上的DApp进行交易时，您应当遵循有关法律法规、国家政策的要求。
						<br>四、免责声明
						<br>（1）风险提示 
						任何投资项目均存在系统性与非系统性潜在风险，本白皮书中内容仅描述项目所掌 
						控资源，实际开展情况与远期愿景，用于传递信息，无意提供任何投资建议。本文 
						件不构成也不理解为任何买卖行为的要约、请求或推荐，不是任何形式上的合约或 
						承诺。数字资产投资作 为一种新型投资模式，尚存在各种潜在风险，Security Pay 属 
						于数字资产类，价格上下浮动属于正常现象，需要投资者谨慎评估投资风险并具备 
						风险承受能力； 区块链技术属于早期阶段， 各国对区块链项目的监管暂未定性，不 
						排除项目运营管理方面的变化。 
						<br>（2）免责声明 
						投资者一旦参与了投资，即表示了解并接受本项目风险，并愿意承担相应的结果。 
						Security Pay 团队不承担任何参与 Security Pay 项目造成的直接或间接的资产损失。 
						资本市场不可预测，投资有风险，入市需谨慎。
						</view> 
						<view v-else>
							Dear user
							
							<br>Thank you for choosing spayx service. Spayx service agreement (hereinafter referred to as "this Agreement") is signed by the user (hereinafter referred to as "you" or "user"), and this agreement has the legal effect of contract between you and the company.
							
							We hereby remind you that before using spayx (hereinafter referred to as "spayx" or this software, which can be downloaded on various mobile application platforms, including but not limited to Google play and app store), please carefully read the spayx service agreement and the relevant agreements mentioned later, especially the "exemption and limitation of liability" and other terms stipulated in this agreement will be reflected in bold, Ensure that you fully understand the terms of this Agreement and independently consider the risks.
							
							<br>1、 Confirmation and acceptance of this Agreement
							
							<br>1) You understand that this Agreement and related agreements are applicable to spayx and the decentralized application independently developed and owned by the company on spayx (hereinafter referred to as "DAPP").
							
							<br>2) When you download spayx software and create or import wallet, you shall be deemed to have fully read and accepted all terms of this agreement. This Agreement shall take effect immediately and be binding on both parties.
							
							<br>3) This agreement can be updated by the company from time to time. Once the modified agreement is published on spayx, it will take effect automatically without further notice. If you do not accept the modified terms, please stop using spayx immediately. If you continue to use spayx, you will be deemed to accept the modified agreement.
							
							<br>4) If you are under the age of 18, or have no or limited civil capacity, please use spayx under the guidance of your parents or guardians.
							
							<br>2、 Definition
							
							<br>1) User:
							
							     <br>A. The user must be a natural person with full civil capacity;
							
							     <br>B. If you use spayx for minors under the age of 18, you need to use spayx under the guidance of your parents or guardians. If a person without civil capacity uses spayx or restricts a person with civil capacity to engage in transactions beyond the scope of his civil rights or capacity, spayx has the right to require you and your parents or guardians to be responsible for all consequences.
							
							<br>3) Excluded persons:
							
							      <br>A. A person other than a natural person who has the legal and ideological ability to enter into this agreement
							
							      <br>B. A user who is prohibited, restricted, unauthorized or ineligible to use the service (as defined in this Agreement) in any form or manner (in whole or in part) due to this agreement, laws, regulatory requirements or provisions of the jurisdiction applicable to the user. For the avoidance of doubt, Chinese users are also included in the definition of "excluded person".
							
							<br>4) Use related:
							
							     <br>A.   Create or import Wallet: refers to the process that you use spayx to confirm the performance of this Agreement and create or import wallet.
							
							     <br>B.   Wallet password: refers to the password prompted by the software operation interface during the creation of spayx wallet, which is used to encrypt and protect the private key. As a decentralized application, the wallet password is not stored on your mobile device or the company's server. Once it is lost, you need to reset the new password with the help of plaintext private key or mnemonic words.
							
							Information prompt: for the information prompt content involved in the operation interface of spayx software, it is recommended that the user follow the relevant steps.
							
							     <br>C.   Specific users: refer to users who must cooperate with the company to fulfill the obligation of personal information disclosure in accordance with Singapore laws, regulations and policies.
							
							     <br>D.   Private key: composed of 256 random characters, it is the core of digital tokens owned and used by users.
							
							     <br>E.   Public key: it is generated by one-way derivation of the private key with the help of the principle of cryptography, and used to generate the blockchain digital wallet address, which is the public collection address.
							
							     <br>F.   Mnemonic words: comply with the industry standard of blockchain bip39 and consist of 12 (or 15 / 18 / 21 / 24) ordered words generated by random algorithm. It is an easy to record form of private key, which is convenient for users to back up and keep.
							
							     <br>G.   Keystore: it is a file form in which the private key or mnemonic word is encrypted and saved by the wallet password set by the user. It is only stored in your mobile device and will not be synchronized to the company's server.
							
							     <br>H.   Digital token: refers to the types of digital tokens currently supported by spayx, including but not limited to eth, EOS, etc.
							
							     <br>I.   Data: refers to the "express" and other content data on spayx. These data are owned by the company and cannot be reproduced without authorization.
							
							     <br>K.   China: refers to the people's Republic of China, including the Hong Kong Special Administrative Region, the Macao Special Administrative Region and Taiwan.
							
							<br>3、 Your rights and obligations
							
							<br>1)   Create or import Wallet
							
							     <br>A. Create or import Wallet: you have the right to create and / or import a wallet on your mobile device through spayx, set the wallet password and other information of the wallet, and use your wallet to conduct transfer, collection and other transactions on the blockchain through spayx application.
							
							    Address, token address, etc.
							
							     <br>B. You know that spayx only provides you with transfer tools. After you use spayx to complete the transfer, the company will complete all obligations of the service. The company will not bear any obligations for other disputes.
							
							     <br>C. Legal compliance. You know that you should comply with the requirements of relevant laws, regulations and national policies when operating in spayx or trading with DAPP on spayx.
							
							<br>4、 Disclaimer
							
							<br>(1) Risk tips
							
							Any investment project has systematic and non systematic potential risks. The contents in this white paper only describe the risks of the project
							
							Control resources, actual development and long-term vision, which are used to convey information and do not intend to provide any investment suggestions. this paper
							
							This document does not constitute or be understood as an offer, request or recommendation for any transaction, and is not a contract or recommendation in any form
							
							promise. As a new investment model, digital asset investment still has various potential risks. Security pay belongs to
							
							For digital assets, price fluctuation is a normal phenomenon, which requires investors to carefully evaluate investment risks and have
							
							Risk tolerance; Blockchain technology is at an early stage, and the supervision of blockchain projects in various countries has not been determined yet
							
							Exclude changes in project operation management.
							
							<br>(2) Disclaimer
							
							Once the investor participates in the investment, it means that he understands and accepts the risks of the project and is willing to bear the corresponding results.
							
							The security pay team will not bear any direct or indirect asset losses caused by participating in the security pay project.
							
							The capital market is unpredictable and there are risks in investment. It is necessary to be cautious when entering the market.
						</view>
					</scroll-view>
				</view>
				<view class="oppupBox-initBtn" @click="hidePopup('popup')">{{ i18n.global.enter }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneEmail:'',
				code:'',
				zone:'86',
				password:'',
				confirmpassword:'',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
				// 验证码
				remain: this.$t('message').global.sendCode,
				isSend: true,
				time: 60,
				timer: null,
				clearStatus:false,
				isActive : true,
				langType: "",
				scrollInto: "",
				toastStatus: false,
			};
		},
		watch:{
			phoneEmail(val){
				if(val!=''){
					this.clearStatus = true;
				}
			},
		},
		onShow() {
			this.langType = uni.getStorageSync('initLanguage');
		},
		methods:{
			sendCode() {
				if (!this.isSend) {
					return false;
				}
				if (this.phoneEmail == '') {
					return this.$tools.toast(this.i18n.login.placeholder_05);
				}
				this.$Ajax(
					'/ajax/sendCode',
					{
						account: this.phoneEmail,
						zone: this.zone
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast(this.i18n.global.sendSuccess);
										
							this.isSend = false;
							this.remain = this.time + 's';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's';
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = this.i18n.global.reacquire_01;
									(this.isSend = true), (this.time = 60);
								}
							}, 1000);
						}
					}
				);
			},
			next(){
				if(this.phoneEmail==''){
					this.$tools.toast(this.i18n.login.enter_02);
				}else if(this.password==''){
					this.$tools.toast(this.i18n.login.enter_03);
				}else if(this.confirmpassword==''){
					this.$tools.toast(this.i18n.login.enter_04);
				}else if(this.confirmpassword != this.password){
					this.$tools.toast(this.i18n.login.enter_05);
				}
				// else if(this.code== ''){
				// 	this.$tools.toast(this.i18n.login.enter_06);
				// }
				else if (this.isActive == ''){
					return this.$tools.toast(this.i18n.login.enter_07);
				}else{
					this.$Ajax('/front/register/one',{
						name:this.phoneEmail,
						pwd:this.password,
						inviteCode:this.code,
					},res=>{
						console.log(res);
						if(res.code==0){
							uni.setStorageSync('account',res.obj);
							uni.setStorageSync('pwd',this.password);
							// uni.setStorageSync('wordList',res.obj.passphrase);
							uni.removeStorageSync('sortArr');
							uni.removeStorageSync('wordsArr');
							uni.navigateTo({
								url:'./backupWallet'
							})
						}
					})
				}
			},
			clear(){
				this.phoneEmail = '';
				this.clearStatus = false;
			},
			changeShow(index){
				console.log(index);
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			agreement(){
				if(!this.isActive){
					this.isActive = true;
				}else{
					this.isActive = false;
				}
			},
			/* 弹出框公用 */
			openPopup(e) {
				let that = this;
				console.log("this.$refs[e]",this.$refs[e]);
				// this.$refs.popup[0].open({});
				// this.$refs[e].open({});
				// this.$refs.popup.open();
				this.toastStatus = true;
			},
			hidePopup(e) {
				// this.$refs[e].close();
				this.toastStatus = false;
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (!e.show) {
				}
			}
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		min-height: 100vh;
		.fixed-plate-out{
			position: fixed;
			bottom: 5%;
			.fixed-plate{
				width: 100vw;
				.btn{
					width: 620rpx;
					height: 88rpx;
					background: #FFCF1E;
					box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
					border-radius: 44rpx;
					text-align: center;
					line-height: 88rpx;
					margin: auto;
					font-size: 34rpx;
					font-family: PingFang SC-Bold;
					font-weight: bold;
					color: #040D32;
				}
				.forget-btn{
					padding-top: 48rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					text-align: center;
					text{
						color: #00A2FF;
					}
				}
			}
		}
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.page-empty{
			height: 86rpx;
		}
		.page-title-cn{
			font-size: 52rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			padding: 20upx 0 0 65rpx;
		}
		.page-title-en{
			font-size: 20rpx;
			font-family: DIN;
			font-weight: 500;
			padding-left: 65rpx;
		}
		.fill-plate{
			padding: 15rpx 65rpx 60rpx;
			.input-plate{
				padding-top: 40rpx;
				.input-title{
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					padding-bottom: 30rpx;
				}
				.input-flex{
					height: 104rpx;
					background: #040D32;
					// border: 1px solid #043680;
					border-image: linear-gradient(0deg, #0365B3, #0365B3) 10 10;
					box-shadow: 0rpx 0rpx 12rpx 8rpx rgba(3, 101, 179, 0.6) inset;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					input{
						flex: 1;
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 400;
					}
					.flex-right-pic{
						width: 26rpx;
						height: 26rpx;
						image{
							width: 26rpx;
							height: 26rpx;
						}
					}
					.flex-right{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 400;
						text-decoration: underline;
						color: #00A2FF;
					}
				}
			}
			.input-agreement{
				margin: 60upx 0 30upx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				label{
					background: url(../../static/login/icon-active--no.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					width: 30upx;
					height: 30upx;
					border-radius: 50%;
					margin-right: 11upx;
				}
				.checkbox-active{
					background: url(../../static/login/icon-active.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					// .checkbox{
					// 	margin: 5upx;
					// 	background: $globalColor-style;
					// 	width: 18upx;
					// 	height: 18upx;
					// 	border-radius: 50%;
					// }
				}
				.input-agreement-title{
					color: #666666;
					font-size: 24upx;
				}
				.input-agreement-name{
					color: #00A2FF;
					font-size: 24upx;
				}
			}
			.btn{
				width: 620rpx;
				height: 88rpx;
				background: #FFCF1E;
				box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
				border-radius: 44rpx;
				text-align: center;
				line-height: 88rpx;
				margin: auto;
				font-size: 34rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #040D32;
			}
			.btn-border__margin{
				margin: 80upx auto;
			}
		}
	}
	#popup{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		background-color: rgba(0, 0, 0, .48);
		z-index: 2;
	}
	.oppupBox{
		background: #111111;
		border-radius: 24upx;
		width: 85%;
		margin: 20% auto 0;
		&-wrapper{
			padding: 0 40upx;
			display: flex;
			align-items: center;
			flex-direction: column;
			// width: 35vh;
			&__header{
				text-align: center;
				font-size: 39upx;
				color: #FFFFFF;
				font-weight: 700;
				padding: 20upx 0;
				letter-spacing: 8upx;
			}
			&__content{
				// text-indent: 55upx;
				margin: 0 0 30upx;
				font-size: 30upx;
				color: #FFFFFF;
				font-weight: 700;
				min-height: 18vh;
				max-height: 65vh;
				overflow: scroll;
			}
		}
		&-initBtn{
			background: #FFCF1E;
			padding: 20upx 0;
			border-radius: 0 0 24upx 24upx;
			font-size: #333;
			font-weight: 700;
			letter-spacing: 8upx;
			text-align: center;
		}
	}		
	
</style>
