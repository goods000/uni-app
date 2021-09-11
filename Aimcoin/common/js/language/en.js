const messagesEn = {
	global: {
		record: 'Record',
		details: 'Details',

		phone: 'Phone',
		password: 'Password',
		tradePassword: 'Transaction password',

		send: 'Send',
		modify: 'Modify',
		close: 'Close',
		cancel: 'Cancel',
		enter: 'Enter',
		confirm: 'Confirm',
		default: 'Default',
		buy: 'Buy',
		buyIn: 'Buy',
		sell: 'Sell',
		sellOut: 'Sell',
		search: 'Search',
		more: 'More',
		next: 'Next',
		sumbit: 'Sumbit',
		apply: 'Appley',
		all: 'All',
		copy: 'Copy',
		share: 'Share',
		no: 'No',
		yes: 'Yes',
		revoke: 'Revoke',

		digits_6: 'Depth 6',
		digits_5: 'Depth 5',
		digits_4: 'Depth 4',
		digits_3: 'Depth 3',
		digits_2: 'Depth 2',

		recharge: 'Recharge',
		withdraw: 'Withdraw',
		transfer: 'Transfer',

		time: 'Time',
		status: 'Status',
		price: 'Price',
		quantity: 'Quantity',
		using: 'Using',
		freeze: 'Freeze',
		amount: 'Amount',
		remark: 'Remark',
		type: 'Type',
		method: 'Method',
		number: 'Number',
		coinType: 'Currency',
		tradeAmount: 'Amount',
		waitRelease: 'Wait release',
		address: 'Address',
		reminder: 'Reminder',
		serviceCharge: 'Service charge',
		actualReceipt: 'Actual receipt',
		available: 'Available',
		walletName: 'Wallet name',
		blockHeight: 'Block height',
		limitOrder: 'Limit',
		marketOrder: 'Market',
		executed: 'Executed',

		sendSuccess: 'Send success',
		modifySuccess: 'Modify success',
		copySuccess: 'Copy success',
		revokeSuccess: 'Revoke success',
		atLast: 'At last',
		noData: 'No data',
		comingSoon: 'Coming soon'
	},

	/* 导航 */
	tarbar: {
		item_01: 'Home',
		item_02: 'Market',
		item_03: 'Ecology',
		item_04: 'My'
	},

	/* 视频启动页 */
	videoContent: {
		title: 'Thunder Bit',
		desc_01: 'TBC decentralized',
		desc_02: 'wallet, the next wealth code',
		btn_01: 'Create',
		btn_02: 'Import',
		btn_03: 'Forget'
	},

	/* 创建助记词 */
	mnemonic_create: {
		title: 'Create address',
		desc: 'Set your wallet name and transaction password',
		label_01: 'Wallet name',
		placeholder_01: 'Please enter your wallet name',
		label_02: 'Transaction password',
		placeholder_02: 'Please enter your transaction password',
		label_03: 'Confirm password',
		placeholder_03: 'Confirm your transaction password again',
		toast_01: 'Please enter the wallet name',
		toast_02: 'Set the wallet name to less than 10 words',
		toast_03: 'Please enter transaction password',
		toast_04: 'The two passwords do not match'
	},

	/* 验证邮箱 */
	mnemonic_verify: {
		title: 'Verify E-mail',
		desc: 'Please set your email address',
		label_01: 'E-mail',
		placeholder_01: 'Please enter your email',
		label_02: 'Verification Code',
		placeholder_02: 'Please enter the verification code',
		toast_01: 'Please enter your email',
		toast_02: 'Please enter the verification code'
	},

	/* 备份助记词 */
	mnemonic_backup: {
		title: 'Backup mnemonics',
		desc: 'Please remember the following 12 mnemonics from left to rightIt will be verified in the next step'
	},

	/* 验证助记词 */
	mnemonic_choose: {
		title: 'Verification mnemonics',
		desc: 'Please click the mnemonics in the order of the previous step',
		toast_01: 'Please perfect the mnemonics',
		toast_02: 'Created successfully'
	},

	/* 导入助记词 */
	mnemonic_import: {
		title: 'Import address',
		desc: 'Please fill in your wallet name and mnemonic, and set the transaction password',
		label_01: 'Wallet name',
		placeholder_01: 'Please enter your wallet name',
		label_02: 'Transaction password',
		placeholder_02: 'Please enter your transaction password',
		label_03: 'Confirm password',
		placeholder_03: 'Confirm your transaction password again',
		toast_01: 'Please enter the wallet name',
		toast_02: 'Set the wallet name to less than 10 words',
		toast_03: 'Please enter transaction password',
		toast_04: 'The two password inputs are inconsistent'
	},

	/* 导入助记词 - 下一步 */
	mnemonic_import_next: {
		title: 'Fill in mnemonics',
		desc: 'Please fill in your mnemonics and separate English words by spaces',
		placeholder_01: 'Please enter your mnemonics',
		toast_01: 'Please enter your mnemonics',
		toast_02: 'Import succeeded'
	},

	/* 验证邮箱 */
	mnemonic_forget: {
		title: 'Forget password',
		desc: 'Retrieve your transaction password via email',
		label_01: 'E-mail',
		placeholder_01: 'Please enter your email',
		label_02: 'Verification Code',
		placeholder_02: 'Please enter the verification code',
		toast_01: 'Please enter your email',
		toast_02: 'Please enter the verification code'
	},

	/* 验证邮箱 */
	mnemonic_forget_next: {
		title: 'Change Password',
		desc: 'Please reset your transaction password',
		label_01: 'Transaction password',
		placeholder_01: 'Please enter your transaction password',
		label_02: 'Confirm password',
		placeholder_02: 'Please confirm your transaction password',
		toast_01: 'Please enter your transaction password',
		toast_02: 'The two passwords are different'
	},

	/* 首页 */
	index: {
		title: 'Wallet',
		subBanner_label: 'Better use of bitcoin.',
		quotes_title: 'Assets',
		account_choose: 'Select account',
		account_01: 'Currency account',
		account_02: 'Reinvestment account',
		wallet_choose: 'Choose Wallet',
		noLogin_label_01: 'Please go to',
		noLogin_label_02: 'login',
		assets_total_label: 'Total account assets conversion'
	},

	/* 充币 */
	recharge: {
		title: 'Recharge',
		selectLabel: 'Select currency',
		chainName: 'Chain name',
		save: 'Save to local',
		address: 'Recharge address',
		saveSuccess: 'Save success'
	},

	/* 提币 */
	withdraw: {
		title: 'Withdraw',
		selectLabel: 'Select currency',
		placeholder_01: 'Please enter the address',
		placeholder_02: 'The minimum withdrawal amount is',
		placeholder_03: 'Please enter your transaction password',
		desc_01: 'Please confirm whether the target withdrawal address exists and is activated, otherwise, the withdrawal will fail and the asset cannot be retrieved.',
		desc_02: 'In order to ensure the security of funds, when your account security policy changes, password changes, we will manually audit the withdrawal. Please wait patiently for the staff to contact by phone or email.',
		toast_01: 'Please enter the withdrawal address',
		toast_02: 'Please input the withdrawal amount',
		toast_03: 'Please enter transaction password',
		toast_04: 'Successful withdrawal application'
	},

	/* 转账 */
	transfer: {
		title: 'Transfer',
		placeholder_01: 'Please enter the address',
		placeholder_02: 'Please input quantity',
		placeholder_03: 'Please enter your transaction password',
		toast_01: 'Receiving address cannot be empty',
		toast_02: 'Transfer quantity cannot be empty',
		toast_03: 'Transaction password cannot be empty',
		toast_04: 'Transfer succeeded'
	},

	/* 转账详情 */
	transfer_details: {
		out: 'Transfer out',
		in: 'Transfer in',
		outAddress: 'Transfer out address',
		inAddress: 'Transfer in address',
	},

	/* 收款 */
	collection: {
		title: 'Collection',
		addressLabel: 'Wallet address'
	},

	/* 市场 */
	exchange: {
		header_tabs_01: 'Market',
		header_tabs_02: 'Trade',
		market_search: 'Wallet address',
		market_title: 'Market structure',
		market_label_01: 'Wallet name',
		market_label_02: 'Block package number',
		market_label_03: 'Layers',
		market_label_04: 'position',
		record_title: 'Current entrust'
	},

	/* 币种交易记录 */
	exchange_record: {
		tabs_01: 'Current',
		tabs_02: 'History',
		tabs_03: 'Transaction record',
		toast_01: 'Price cannot be empty',
		toast_02: 'Quantity cannot be empty'
	},

	/* 生态 */
	ecology: {
		title: 'Ecology',
		lable_01: 'My DApps',
		lable_02: 'Recommend DApps'
	},

	/* 我的 */
	mine: {
		title: 'My',
		subTitle_01: 'Use settings',
		list_01: 'Account management',
		list_02: 'Block browser',
		list_03: 'Language switching',
		list_04: 'Help and feedback',
		list_05: 'User agreement',
		list_06: 'About us',
		status_01: 'Not active',
		status_02: 'Active',
		status_03: 'Activated'
	},

	/* 账户管理 */
	account: {
		title: 'Account management',
		create: 'Create address',
	},

	/* 创建账户 */
	account_create: {
		title: 'Create address',
		placeholder_01: 'Please fill in the name of your wallet',
		placeholder_02: 'Please enter your transaction password',
		toast_01: 'Please fill in your wallet name',
		toast_02: 'Set the wallet name to less than 10 words',
		toast_03: 'Please enter your transaction password',
		toast_04: 'Created successfully'
	},

	/* 账户详情 */
	account_detail: {
		title: 'Account setting',
		list_01: 'Modify wallet name',
		list_02: 'Export wallet information',
		logout: 'Logout',
		placeholder_01: 'Please enter the wallet name',
		placeholder_02: 'Please enter transaction password',
		popup_desc_01: 'This operation will result in the loss of address and private key. Are you ready for backup?',
		toast_01: 'Please fill in your wallet name',
		toast_02: 'Set the wallet name to less than 10 words',
		toast_03: 'Please enter your transaction password',
		toast_04: 'Modification succeeded',
		toast_05: 'Logout succeeded'
	},

	/* 钱包信息 */
	account_export: {
		title: 'Wallet information',
		success: 'Export succeeded',
		desc: 'Please copy carefully and keep it safe. Do not disclose your private key, The wallet server does not keep the user\'s private key and cannot be retrieved if it is lost',
		label_01: 'Wallet address',
		label_02: 'Private key',
		label_03: 'Mnemonic'
	},
  
	/* 帮助中心 */
	help: {
		title: 'Help center',
		desc: 'I will try my best to help you out!'
	},
  
	/* 关于我们 */
	aboutUs: {
		title: 'About us',
		list_01: 'Version log',
		list_02: 'Version update'
	},

	/* 状态 */
	status: {
		applying: 'Applying',
		success: 'Success',
		cancelled: 'Cancelled',
		confirming: 'Confirming',
		completed: 'Completed'
	},

	toast: {
		noLogin: 'Please log in first',
		tryAgain: 'Please try again later',
		toastNull: 'System abnormality(Null)'
	}
}
export default messagesEn
