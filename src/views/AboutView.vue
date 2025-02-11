<template>
	<div class="handleScroll" v-on:scroll="lightUp">
		<div class="start">
			<div class="title-text">星艦學院科幻社簡史</div>
		</div>

		<div id="time-line">
			<div id="time-line-background"></div>
			<div class="cover-up"></div>
			<div id="time-line-progress">
				<div class="time-line-progress-bar"></div>
			</div>
			<div class="container">
				<!-- TODO:store data in json object -->
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							1998.10.6~1999.6 <br />
							李晃（Paladin）
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">創始社長</span><br /><br />
							10月6日社團成立
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							1999~2000<br />
							辛逸軒
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二任社長</span
							><br /><br />
							第一次參加社團聯展<br />
							接下原科科電子報，發行科幻科學報
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2000~2001<br />
							李佩琛(sealstar)
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第三任社長</span><br />
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2001~2002<br />
							李雯(Kestra)
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第四任社長</span
							><br /><br />
							第一屆星艦週<br />
							與Hallmark 頻道合辦Star Trek影迷茶會
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2002~2003<br />
							陳建文(lonegunman)
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第五任社長</span
							><br /><br />
							自拍星艦電影<br />
							星戰啟示錄電影特映會<br />
							第二屆星艦週<br />
							外星人扮裝大賽<br />
							多家媒體報導星艦週活動
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2003~2004<br />
							郭宇航(danielguo)
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第六任社長</span
							><br /><br />
							大學報採訪<br />
							偉來電視台採訪<br />
							克林貢傳奇
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2004~2005<br />
							李柏勳（gsklee）
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第七任社長</span
							><br /><br />
							Elite Force Championships電玩賽<br />
							製作社員證<br />
							聯合新聞網報導<br />
							製作社服<br />
							書庫成立
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2005~2006<br />
							姜皓天(Prometheus)
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第八任社長</span
							><br /><br />
							迎新宿營和真人RPG<br />
							Phaser製作<br />
							全新未播放影集
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2006~2007<br />
							杜貞儀
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第九任社長</span
							><br /><br />
							自製短片《星艦學院：范統艦長的誕生》<br />
							開始轉型為科幻社，不再只有Star Trek <br />
							中天新聞採訪
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2007~2008<br />
							郭毓璞（亞特）
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十任社長</span
							><br /><br />
							午聚<br />
							舊網站停擺<br />
							反烏托邦經典閱讀賞析 讀書會<br />
							社課地點由電機二館改至第二活動中心<br />
							午聚<br />
							師大青年記者採訪<br />
							建立社團書櫃（原書庫一年後慢慢移入）
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2008~2009<br />
							葉多涵
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十一任社長</span
							><br /><br />
							午聚 <br />
							蘇逸平先生演講：華文科幻小說尋找中－瀕臨絕種或是從來沒存在過？
							<br />
							社辦移至二活908 <br />
							建立網路書櫃 <br />
							社團BBS站DS9年久失修開始故障<br />
							接下原科科電子報，發行科幻科學報
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2009~2010<br />
							洪仕翰
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十二任社長</span
							><br /><br />
							當代反烏托邦 讀書會<br />
							停用官階系統 <br />
							高志峰先生演講:超省錢!科幻電影DIY<br />
							海柏利昂 讀書會 <br />
							葉李華學長演講：倪匡封筆後，中文科幻何處去？
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2010~2013<br />
							高唯中
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十三任社長</span
							><br /><br />
							紐羅門瑟讀書會<br />
							社團BBS站DS9壽終正寢<br />
							新網站建立<br />
							難攻博士演講：「機器人時代的誕生前夜」<br />
							科幻文學讀書會<br />
							參加台北市立天文館主辦之天文科普科幻講座「天文科幻書籍介紹與討論」<br />
							Star Trek: Into Darkness 影迷場觀影
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2013~2014<br />
							高章琛
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十四任社長</span
							><br /><br />
							複眼人 讀書會<br />
							李嗣涔演講：人體身心靈科學-遨遊外星文明<br />
							葉李華演講：三千年前、三千年後與三萬年後的機器人<br />
							正式登記為星艦學院科幻社 全台科幻社最後基地<br />
							葉李華教授社辦聖誕聚餐<br />
							學院前輩EE2,142聖誕聚會<br />
							POPO方世欽西方科幻與美漫演講<br />
							洪寶國 (寶抓抓)金屬工藝暨steampunk主題
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2014<br />
							王紫讓
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十五任社長</span><br />
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2014<br />
							Boyi Chen
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十六任社長</span
							><br /><br />
							推薦「北方大道」<br />
							社團博覽會 <br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/400382433446779/?type=3&theater"
								>科幻電影中的天文(吳志剛)</a
							><br />
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2015<br />
							曾可維
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十七任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/441266852691670/?type=3&theater"
								>科幻中的哲學凝視(陳瑞麟)</a
							>
							<br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/469407213210967/?type=3&theater"
								>電子遊戲實作(海龜)</a
							>
							<br />
							LARP(尤達) <br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/461087004042988/?type=3&theater"
								>科幻中設定的合理性與合理性的設定(王躍達) </a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/477297945755227/?type=3&theater"
								>新世紀福音戰士(Wayne Chang) </a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/483676175117404/?type=3&theater"
								>科幻與心靈— 兼談台灣的科幻詩(陳克華先生)</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.439582076193481.1073741831.163428443808847/502765413208480/?type=3&theater"
								>（與城邦書局合作）書推「亞特蘭提斯三部曲」</a
							><br />
							星戰7影迷場觀影 <br />
							星艦49週年與老學長聚會 <br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/537663243052030/?type=3&theater"
								>科幻電影中的時空物理(欒丕剛教授)</a
							>
							<br />
							高偉學長系列演講
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2016<br />
							馮業帆
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十八任社長</span
							><br /><br />
							<a href="../images/Logo.png"
								>新設計社徽圖案/社服 by 簡靖</a
							><br />
							Star Trek: Beyond暨Star Trek社團聯合觀影<br />
							天啟事件
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2016<br />
							林介元
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第十九任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/688473204637699/?type=3&theater"
								>DeltaQ-47 星艦迷航Star Trek與冷戰終結</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/708164279335258/?type=3&theater"
								>劉真伶 (Jaina) 西部科幻</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/722642721220747/?type=3&theater"
								>POPO的星戰講座</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/730338300451189/?type=3&theater"
								>陳智圓 日本動漫作品中的科幻元素</a
							><br />
							星戰3.5影迷場觀影<br />
							天啟事件
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2017<br />
							吳建燁
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/791433411008344/?type=3&theater"
								>高偉 攻殼 Ghost in the Shell主題</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/815912125227139/?type=3&theater"
								>彭士庭 生物科幻</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/819632491521769/?type=3&theater"
								>高偉 DC與Marvel的恩怨情仇</a
							><br />
							天啟事件
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2017<br />
							吳建燁
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十一任社長</span
							><br /><br />
							社博企劃<br />
							諸多新制度及經營模式確立 <br />
							榮譽職銜計畫<br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998.1073741828.163428443808847/895151643969853/?type=3&theater"
								>Star Trek: Discovery暨Star Trek社團聯合觀影</a
							>
							<br />
							電影< 時光 > Paradoxical 合作企劃 <br />
							新網站計畫
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2018<br />
							易建宏
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十二任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/941026919382325/?type=3&theater"
								>參加''Trekkie'' into darkness Star
								Trek粉絲收藏展 2018.1.1</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/982691291882554/?type=3&theater"
								>杜鵑花節企劃 2018.3.11</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1013970628754620/?type=3&theater"
								>泛科幻獎協辦單位</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/985040961647587/?type=3&theater"
								>亞次圓
								《刀劍神域》：你知道什麼是虛擬十六連擊嗎？ 社課
								2018.3.16</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/986978531453830/?type=3&theater"
								>刀劍神域 社課(活動合影)</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/992219734263043/?type=3&theater"
								>半瓶醋 科幻電影的人文精神 研討會 (活動合影)
								2018.3.23</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/995605657257784/?type=3&theater"
								>欒丕綱「從廣義相對論到隱形斗篷～來自幾何的新科技」講座
								2018.3.30</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1002915986526751/?type=3&theater"
								>馬可多 「台灣星戰史」演講 2018.4.13</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1026147047536978/?type=3&theater"
								>張家凱 Star Trek:Borg Physiology 社課
								2018.6.1</a
							>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2018<br />
							江元裕
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十三任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/1187363658081982?__tn__=-R"
								>20週年社慶活動紀錄 2018.12.1</a
							><br />
							出版社抽書合作案<br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1142434082574940/?type=3&theater"
								>黎駿朋 2018漫威電影回顧 研討會 2018.9.28</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1149008845250797/?type=3&theater"
								>亞次圓 末日是我們自作孽？淺談後末日科幻作品
								演講 2018.10.12</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1161123550705993/?type=3&theater"
								>科幻、娛樂與生活 (活動合影) 2018.10.26</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1187963438022004/?type=3&theater"
								>馬可多 「一把光劍的大小事」 演講 2018.12.7</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1193408770810804/?type=3&theater"
								>高皓庭 時代的眼淚:GUNDAM挺立於大地 演講
								2018.11.23</a
							>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2019<br />
							黃道永
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十四任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1208982792586735/?type=3&theater"
								>2019新年科幻:銀翼殺手2019 2019.1.1</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1232873736864307/?type=3&theater"
								>科幻作品介紹:[艾莉塔：戰鬥天使、銃夢]2019.2.6</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1263462820472065/?type=3&theater"
								>科幻專欄：早逝的創作奇才—伊藤計劃 2019.3.20</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1278656988952648/?type=3&theater"
								>科幻專欄：神秘的黑洞 2019.4.11</a
							><br />
							<a
								href="https://www.youtube.com/watch?v=Pb10dCbeTDc&gl=US&hl=en"
								>戰鬥天使的降臨—銃夢與存在主義 研討會
								2019.4.26</a
							><br />
							<a
								href="https://www.youtube.com/watch?v=h6Rluqr5agY&gl=US&hl=en"
								>絕地與西斯：宗教、信仰、與道德 研討會
								2019.5.3</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/1295392453945768?__xts__%5B0%5D=68.ARDet8jgUu6zDp-vmUD5pctqKExcSAkkngQvxfLydnTjEPI-eaeDfLtPjyhf5Qw6nbVtWyDq9FcNgTph5oP9akke1bfOPS11RnuaYJqOD-y7-CeZo9ENB3fPCuQV3LCQ5TDwzB0gMAazcZpXDp3n-OZF_mDcCwaqmuG85hntmTQwp3kHB0XtiNtJGuMGg6UJCcgdNbCoDjC9ifhdbHUzkIiOmc9jwerVQ4XiXgtPd2T8PHT6v8yQQOafMOU3F0cYGb3fMfpmLVtiAj2LUEnMExvJxy5KplTW9MyHlGMbxi8IU3zgYodRz_UyACv-DHlRjVhKkOkvqsqBGolAD_dmQ9LN5A&__tn__=-R"
								>星戰日活動 2019.5.4</a
							>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2019<br />
							江元裕
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十五任社長</span><br />
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2019<br />
							黎駿朋
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十六任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/events/1343009802529444/"
								>新東京末世:Akira與科幻迷的未來狂想 /
								Akira電影放映與座談 2019.9.29</a
							><br />

							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1416545931830419/?type=3&theater"
								>京都動畫的科幻夢 / 亞特 演講 2019.10.4</a
							>
							<br />

							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1430529350432077/?type=3&theater"
								>科幻創作技巧 / 葉李華 演講 2019.10.19</a
							><br />

							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1436780383140307/?type=3&theater"
								>機甲眾神-重甲機神 / 傻呼嚕同盟 演講
								2019.10.25</a
							><br />

							<a
								href="https://www.facebook.com/ntustarfleetacademy/photos/a.163430267141998/1472166046268407/?type=3&theater"
								>星際大戰真的是非常奇怪 / 反腦工作室 演講
								2019.11.29</a
							>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2020<br />
							黃道永
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十七任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02RHZ7DcFd1ZWEHCBAE2WpwkvkgA98eiU6GrFW3HeE9b5Zds6bVTm3XbvJGvi9miZ6l?__cft__[0]=AZW2pB7svB-XhTH-DhwitDHbJtZjzPNTLAfBTq07WMNn4W9Y1eBVZbWNyK3sR4OJCMKIjo_skkGfIxI7t929hje1OrLASe8ldqchL0Tnu8iOcHOQBnyyB4u2dDzGgzZ2eC_sF_f-gvKm4scIto-BDlRfOiMW8VQ4xBnOtS5IeemWaT2kHe7MNaAVKMSfsuoozY0&__tn__=%2CO%2CP-R"
								>Is this Sci-Fi reference?科幻影集討論會</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02GisCne5WwkBS2WtkaRrBnSnjUheDThTx8k9Pp3JcwWRdD4BVbGQwu8L4SEKzBgvml?__cft__[0]=AZXFhR_-kfIBAF8Yqfa_vNu9hwETLxJBlWcbAK275Rck7q33jQbNY9v-RQ4sz2RJVyUFK2t0STWWU1OxBWTW1blvFEu2xCkWCPGcdou1IwEJR2ceH33vygjfLsiX2a7ouVNnT5AM53KyaLYTtJg0XA2e3t4lTToQ1j87ITm9rDyPbPF12P8psEzU-c-IBylPZCk&__tn__=%2CO%2CP-R"
								>科幻小說作者來報到:《天啓》分享會</a
							><br />
							<a>Rick and Morty研討會 瑞克到底在想啥？</a><br />
							<a>經典影集：雜談Star Trek現在與過去</a><br />
							<a>把蜥蜴放進微波爐回變哥吉拉麻？</a><br />
							<a>科幻電影收藏與各地見聞</a><br />
							<a>DC與漫威之外:你所不知道的美漫</a>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2020<br />
							徐捷
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十八任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid021mxS5rzXYcef85gSSM7y5p89VMssY3p9ATzcPzdBuhYzD1nUGSb9JBmW8oDzw54Vl?__cft__[0]=AZVfsxXCBArDNQszMp9TpThdrmsPOjTT3RoXcKEYtu1KQkhCDqS_xHgweT3681oWLw2T-7Csy04FY4uD_-uFWanxd_pU1fmGJZcwQRfD5-RIbcLhNwJxXHwrNuD5VpJazFyjjQnhYjsOIgViF3CIPbobPlrZ7-5WXE9-U0sE2EBXVOjDjLUvIfovcxTC5TISRcQ&__tn__=%2CO%2CP-R"
								>科幻電影收藏與各地見聞</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02SVmzMvYhx6coALAz2XhuphEVT7u2oJeY7CNjXkFYjHAMUNB4pETmNXJsi4GkEZjBl?__cft__[0]=AZUq2ZVlu0AkPRD7DyxylX0eeM30qSvSzL8Q3XMRWP97tpotk2Qxt0Z_1m_4RY-Y6xff_nFSDvjEjF6b1oR4eOWkvKRtx7S8jHPxOyXM60UQTeApU1tR9gwUROnhR8EJHcerIVYJFgRlXsC43SMP6Ve234lfnZjsdEC89lskKrh0MXWvhRF5TniBBRQEoxaNzyo&__tn__=%2CO%2CP-R"
								>ㄧ生畫九命：阿推與科幻漫畫</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0TUT%L9uCrejByMA6K5tCqaT7n2MfGYnVHfy5q9pmVSP6rE1Kjq5KqW8xASCSWu3l?__cft__[0]=AZUaIaAGcWcsGlJJeLucqC-HgNynZQ5TsftKgQSBGu21b0IKyRhYz1wMYdf0vxlTWq5jzC5PGMoOb1DJ8ChVyPCRYrAkmAYKe3T1MB48z6zj5T-uedZqlh31qmp4cgKabl5WDAdGTWmPsS_sfd4pgJO_q7q5tVQDeiXzmiRTn8WE-KYP0mSetfqxDHI4UIB86m0&__tn__=%2CO%2CP-R"
								>拉麵在地化X科幻在地化</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02ehtrU2FPVx2VDjM4XigFt3erZi88b9h3zAQzAMtNWsL%FTULQufevgD2Momtfkol?__cft__[0]=AZXYNKmG62Nk27lyQJid802H87T4XqY82drvxbXqlMwCXMNEj09NkiHBlYh-zg6yI5jVUwiFGGQcaTCgFFoXmkuhx9QX6wwSrP0b8QaWP-hbftdtuMaya5uJoeAj8d6k35S2EiM9Yioq4twgNuTv9ox_YzlD5nIuHSBbCGRd3uAbuOxBRIfdKoQNGiM1l7cgBBg&__tn__=%2CO%2CP-R"
								>科幻推薦指南</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02TnuujMoefgZjVZijFV2svHyWe1EaoX19umw2Ai1hDe9EkiXpjFEgu3cb7tRzQEQal?__cft__[0]=AZUT3kDOSCryzYt8SYTpYyeDIwVbVYEDDvqrcRGWa7kkWSlGOiTBBJSnygnCJRzoDC6UUDg-ea4xRWSDMU2DaRsfzVPNOt7ZKf9WGaaz9CfP_3wrL0ZXyNlr1Wzob01lce-qvfXBKdtj91HbCcdTgPqMKz-LH9y_iqTvIk4UDQlB3Aeh3MKlHtO72_R17lIVo5Q&__tn__=%2CO%2CP-R"
								>淺談Star Wars與Star Trek的互動趣聞</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0voCsPF7Wn2iVpkRfgtCy8vnF6d3QMKZPtKyWgkASSPPZAkUfN3M5H7gATWR3XXuHl?__cft__[0]=AZUjJgxRr5egrB1fmdgOlWSHzNTdojvrA0DqQOlG9Vo0h554vZnQIhFiOdHZFki4qeGa9HmIthUSgBYb8HJwQrcMVI-OARBAhg1wnd_Zb_gOg3KxMeFT1FJDilXNord4nMh11UKplTA8ZekKEnpjxoZY-_bf_sw9-Jb_Ybm-ZKZPpUgfqFWEB9E1f_5Ta5BjmH4&__tn__=%2CO%2CP-R"
								>EVA生活補完計畫</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0i4qSF1MG52fkmnDaQiFL6rj6bNdh6ouMy1aeJDVNRR73QX1fBGqjf3UHae6zeCdDl?__cft__[0]=AZXe21QO85uOHwWxzvCWbs9G5U8Hp-PQnn4ZGVHPu1u0IeYiVvHWmSlgONvbppu_RMvtRjHNHEp2nWMZW6YjnQEYNUbLuSJ0nb1SHY6w4HHVBMWsJGWojmuzsnqcsAN762NV3L5hj6V5j38wXjDMtpCJZP_5is07Lz6lbVLWbi9Z1w6YiNIR8nSxIRg_DzhiqQk&__tn__=%2CO%2CP-R"
								>裝甲騎兵xOBSOLETE</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0uy3U8ddoXPUvGhXnX2CvtT4xUL9Yt1CPemtUPDoRY2dCvrD33oQy8qZA1PNhAeiZl?__cft__[0]=AZU83t5d2MaOl1mZInk2ixUiJsSujXYlqolvBGoOGUq0LzwdTZmIruwTm2hSB_5RfW5mQfvjYwLpGcA4ullI6tFvLajNuSUFW3WZ5YMKjNxqM69HzKpzxxeDNWgrdbRQYtJy4Kl0z427VQNNGhTEWVvaDhvxzJ5Kq83QE70P1IKJmRqHP0w_Ti49W90lhj4weB0&__tn__=%2CO%2CP-R"
								>美漫業界及近期故事發展淺談</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0d6XBdxrFB63BPA7ozfEkuVzrWem99nmg4V6w8Qfpy2APLDu9u8qpRNvKHGiJtRQBl?__cft__[0]=AZVOnfZhCC6rG8fTPoUeetMhFThG6-Trl4e7dXhvcqc0V4TIHh6Jf6EQ8DstwarUfpFb745ExKUY7vtrCiHLF7dqiUKZNwb240uKaLvt3qrv-uj8l6kYHfT-K5NOj5ULw15TPNkKonteVna6GTZGRzrYhb76f04KjgnJRoa1Fha3XbVZWNJUcmCJXsU0tQ4oYxY&__tn__=%2CO%2CP-R"
								>科幻小說史</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02HPJryDPHZvk3Ag4xbqTynFtQyCvNm9WkfL2Bk2D1bXnFajQZXXKTQmwfJNVJ77Edl?__cft__[0]=AZ%_n7Z_gbkO7jUd-0d37zBRk5CTqpkIwWVAx75yy-GaJ_Ft3Ialr9HghhlzNErDzRLTXN4ZM0voAlou9bP5LmB7UGFGofjcRWjTO4QvyZcW6cONZRzYI_HhAQLIh2sAouRGLk3Fbtul3PU85hXB66rruh12Zl-KC9JdYl7Jvi66yeUzyaE0ZojBcG_qMEDqJs&__tn__=%2CO%2CP-R"
								>Dr.Who與英國文化的千絲萬縷</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0kmzJfQmr9vXMZr5ZTkeupBoVs3KWzY4BggSbSNVqZemBCKYkp5cJV9WKdSAaTU8dl?__cft__[0]=AZUNCyW1hBPeqQlqCrwUOWEKWD9r0V1PR3XzftBAt6FY4McZIfhzzY6qDrlnLllkzXO_fIVLYi8sx9Z0r41wYLGdzFOXvZg_PS99LveZWVT1JyEmbfsD500Yys3JA-7m39nk7s0aoJNS-GT4B96sC22vm30srLplsRkhV3K-hSOh87CBifaQmtqKK7Rw2R7vQKY&__tn__=%2CO%2CP-R"
								>科幻遊戲解析</a
							><br />
							<a>科幻電影解密：戲服</a>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2021<br />
							湯惟中
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第二十九任社長</span
							><br /><br />
							<a>沙丘(Dune)電影觀賞</a><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid06eV4Jd2kWdTvaeUdf2X7gWUk2KzZ5a98typmF6ZZ5JQVJAG9yCnXRQRCrfTEwXhJl?__cft__[0]=AZXzl7iyJdpxcVtfLoDCmEbigyAXZGUKM7Wr51dfsQXoDxyOFYNkCZJJFZTvA1lIHkuU_7iowoRX_vbIusLreWZEADWqAYntpRnRWcPl4gIWHwbq12QCbWz9EV2yWdDhvzBet9AgkcXeI1-8AbTdTRirFQnOs5oCSVQsMO9o3WSTURwwvn0CSCff7vCY0ka6jm0&__tn__=%2CO%2CP-R"
								>未知與發掘：淺談虛擬貨幣</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02a1R2w8YbNmsqcsM6oEHB4YMoTRtB9WZryrnYHtVJtCphrnKT7QbaDnYbEFfn7Hz8l?__cft__[0]=AZXLaNWAoc5RfXehudpumrkshWvKNG5yMJDkzxvVYXy42kG_3G33B56xMWCvQFPuUIobYIM_rY3_kmQHfjQe4idkZYAcfRLsitOkBROES-SMSfuds-ZGtarJKFhxF0bfusRJXkn-pdI4R4UCfWbIazjBiU4Do7lX5yggQLgewqbFUH3WUK9ynIM7-CYvvsT2p8c&__tn__=%2CO%2CP-R"
								>EVE Online：克隆飛行員概論</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02SPDuxXd8Qg4Z48TCSRejXjEFXZbGxjwNsawcxK493nzXKAQakfSjaDFzEcZzqidel?__cft__[0]=AZVs6RJU-dfAffTFgp_r4GRdXbtrmJM1-KznSsszZHTJ32swLw2SNEFENOhSxMQK8xdPJPrKxNtC6sjiBaoveTQUTBP3iEJW3bHrXlze5Ji-7CtuUqzPpgTra0yhz1xrjGaYSWAa4jU2aYJY5uitMqEQuUfTqb6CfrSQXMJnxy2dYvLynq222NxNZFUtlicoXnw&__tn__=%2CO%2CP-R"
								>亞洲少年的未來圖景：日本動漫的科幻想像</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02AGGyCiyeUUxnrjRitUjEZ47EvZvZ1hRrVpEyaE6NRrZZM5VyKyzCeqsnrRG2QhgKl?__cft__[0]=AZWEhLw7jQVbI3HcpCPsVAk1VXL1AYyjh5PjSNSYRHLvHZjof8GOqgWzQLU33LKf18MzMlku_Rk19rSaCWsVjbCHrKvbc7J0XxC0JgsSKeStJTbJxOEyRy0rqdiYG_LtVEpvqA_T2Abi0v5auBQeE8rnZdfd1JFgde90P7yaG-hEy4wvKGAoCOT1kMxKRBTZ1g8&__tn__=%2CO%2CP-R"
								>娥蘇拉勒瑰恩：性別與科幻</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02d4t7RhdTpQkTzk1siFxU4RDmeKbtxbXNa1q6gtcs6E79eTdZNEQX78J8nwsydptLl?__cft__[0]=AZUjGZN6FwZN6N0VYy_zefMrRvfSvg19LvdyrbtZnGNOUN2VTKYUjH-uZqJ8QsHW4OMOvdABk0rzWnHj1hPoqVvJksPlDr1Br7grF-Wjbm_VlWySVEaEWGw6l4Gg0FHDy9SKD3xR1mPDLSssj3uGHMx227kc3QL3b_NNerXtNbNSBvLLv0xO-QH9duoZ16vVCa8&__tn__=%2CO%2CP-R"
								>超級英雄與倫理學 研討會</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid031EipZusvSUJ1NbMsGMdesiWCfBCFhLtDEWZ5zqJ82aUDFGjidSdJhqQLCPUUmMjYl?__cft__[0]=AZXF5eP-QtlZiOXkZ5ucaYiGQ2knozpiMBhQvdxlVJs3zNUqnBj0wloyOKj5jI8gt22RvoBSFuySDbGKDFHg7Q5btxASRR5BzkkcwzGvX1JWcv3fNG2CXo7imG7njNZKufIz5XrbnPoE1i1LopY3V-Lqjck6kk4vxmjA-I_9qpziow-usxNNYvrw9NCVjmVSqFU&__tn__=%2CO%2CP-R"
								>淺談美漫的瘋狂多元宇宙</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0ra2czFjUaxveH6aUcBhoNRtqpVMp6QSGDmoUKN4TDt3eHSKWbSXc8FY9msfjXq3Rl?__cft__[0]=AZUX7mxQ9ICjtBRoxd2QTEZsFLmhqOAEqIzG2Inuhp7U1N2cZ9OECebow3F5Vr-RMN82TsVfImbog3SLt-6aLwyjwTR38avjokwqZozYtxlDbtmJp6RbgmIErfP6sQ6_4gy3u7zmyxvJQd_Ces4ais-Ncb-hiWjwmP7flN5zxfyE_xjuRPW9I2u0S4nm396eTjM&__tn__=%2CO%2CP-R"
								>翻譯科幻著作上的困境</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0y3PDgpksPkKZymtpvQvEGhcfJrTZNPdmHYqCP47jDCyisycrFLtsnZv725ZyLSMGl?__cft__[0]=AZUq4uKkcylSV7iq0jiuJ2oCSAY8JIHsRdyG1xcVtcM9m7Q6-PF503hOTn61k4604t9crcCOkHbuFCd2P36OCGchDyMooarfXxynoOkxqzIjvtoWP8EF85Koa1D5adyv4N5VvylWXL24mGZ82uaWyFI4ECWVs8wkaGlcquAJ0sbWZNUOnMd30Db%C2DRbA_IRY&__tn__=%2CO%2CP-R"
								>科幻軍事戰術淺談漫遊</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid026ZZxcHAjJTyiARcsfUpeXPxovHMJs9QcXQajwsR7iBFsTKgygP7YeoAqkWzFQWMil?__cft__[0]=AZWrpJwCx-xdlTkFK4Y6pX8E1xkckBdSuze6hzrsy7ueI3vib7H4K_sH-Ad0-1sczIre-bR9_Ws5C7hzV1uwPNNNI_HkL8XBR98_18268udyvKpbtQGpQqiirSUB5g3io2e27e-9GbxsiqSnwybPtgPeKFBtaAjkc-X0pRHzP02JwoZpJAerLrH86Hq2jVKTJG8&__tn__=%2CO%2CP-R"
								>沒時空解釋了，快點上車！ —Back in Time, The
								Future is "Now"—</a
							>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2022<br />
							周奕彬
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第三十任社長</span
							><br /><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0q56aqhKmmHiESx5v2hWAvNkBLMUf3UP7H496i9C4Y1FKd4uVUNQj8QZAdHzw1LC4l?__cft__[0]=AZVKFlo3lt53XlEWMOII3UwfL0RgXRRQAaiI4xVASBYj4f26xiHHEK7-JLVQLrbYapQTJ3ywAF5EbHjKXn_Tg9LU2OBXmbBsddIVJOOBFyzFL7P0jLYqNhbSFCvsewcQ3pDg40tkR07gkC9NmCM11W53rqISWFKkg3ipJ5v1RiuHAg&__tn__=%2CO%2CP-R"
								>台灣科幻文學史</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02xgrJpGKyb7QEmDouyvCk9bJBMDPsDggJd9HPebKT5AuFa5LXqkdieLiHPV9JMbg5l?__cft__[0]=AZUMm1j1JVJocBzv1MVa69IrMQY7GE8aybVDia503ib55kzft2_sEBCcA_zAyYtCnfuPK60vgvNayvV9eZ87xjLqB8B6LJzbdEr9OcIG-9sMTrXETliECeSfg7f-_jk0aEvUPbb44YRsfQsuNhb90Y5hRntJKfE8ZuMMQivj-DfWTA&__tn__=%2CO%2CP-R"
								>邊緣行者 討論會</a
							><br />
							<a>銀翼殺手讀書會</a><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid031S5aNzNUzQKiLyAviBDuzeVT4HgmNhpXrod7LKK3dg3WoMfXknyTfTKqUxhqnaxYl?__cft__[0]=AZU8E_apXLESzbiF3IXUrOx6Sg3t2iPkY-tna6gAXYf7VjHTifSbGzCsKqRsVJdm56niBMpXLSkrUcHjkiHbZqfGxXzUUe3s_RfmiTYouUGpIF_q9TOdeGRD6M8PxXyNlBPiTulDrMWwEX_uay-VMI1sf77OPpFe72RbnV8ihqMGCnxo8sqsvbWqS9Owaqrng5o&__tn__=%2CO%2CP-R"
								>戰錘40K 入門導覽</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid0nBtyCeTvGiMjQ1wcehcm3VpjGxRgXLsazR9h2zx3erzjwaWWbyPpCwzx6r1oq7dal?__cft__[0]=AZVXLo_-dyIIs8IX9phVDumY-nDeeKWvU9XGbVcE-5jzAZi26l18Y9j5cjXtivv1NGKB4VbG44gVhVhRURsw-_UTSPAapjVVM6gzTsM9XDvLM4uMQzZSVyBWPyQyMiBFHS1I_FUsJsTxVONPvrWAOwiQUAlSN3apzfToA1iN0-vBIUS8MFLm1PKR9Y9RAhkWSDk&__tn__=%2CO%2CP-R"
								>AI繪圖/鳥巢 演講</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02NCtRpWnXsmxvCYG3CCw95KneNvERhSphH79UPUkpGBCa2F5Bmc6ggBcVymLBoSndl?__cft__[0]=AZVLWbyGoLq3so%rqUo5OTujKCkpG%BkQ17MJ3uhW9WVtPn0-jWmmhfOSlUxPVyXR2CvnJgjqqXKOZSAWw6ItzGn0nouRLAOhMC__V3a2RIhFZYndAZkqmPIicvmOE3FXikVSO5QhHgE_68cuIkBIub9Kf3-RqD5YXzKA7DrRgIC7TLMvNyf4HfBtAKgF12FI&__tn__=%2CO%2CP-R"
								>從道家觀點解讀伊藤計畫《和諧》的反烏托邦美學/趙恬儀
								演講</a
							><br />
							<a
								href="https://www.facebook.com/ntustarfleetacademy/posts/pfbid02h72cADnGF3YcmixHghTjmk2PmEbsicgnQHLZnsM74kud5NYQ6dKBuYuMgodHs8m1l?__cft__[0]=AZXsYz7n2A1DRZTT91MQEgz0AHV9T2nJi8TphxgalIVZng0UgP47FURjbE2eckA9a4E_IjDRkRIKrrj0uS4O2-mQkaYYmZR-50BfcKB1kBSpKnjdxMX-HFMYcB4p-D-6zKdLLcXv2t1v7Z0_ZU59R3eGnDikesAeotmmc3XyYyJiEYYVE_mGHx1AYI2Vh0uZ0KU&__tn__=%2CO%2CP-R"
								>星戰慶典之跟電影演員成為朋友的點點滴滴/馬可多
								演講</a
							>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="time-line-left">
						<div class="time-line-left-text textDark historyText">
							2023<br />
							余宣辰
						</div>
					</div>
					<div class="time-line-dot">
						<div class="dot dotDark"></div>
					</div>
					<div class="time-line-right">
						<div class="time-line-right-text textDark historyText">
							<span class="president">第三十一任社長</span
							><br /><br />
							架設新社團網站
						</div>
					</div>
				</div>
			</div>

			<div class="cover-down"></div>
		</div>
		<div class="end">
			<div class="title-text">TO BE CONTINUED . . .</div>
		</div>
	</div>
</template>
<script>
export default {
	mounted() {
		this.initAttributes()
	},
	methods: {
		lightUp() {
			var dotDarks = document.querySelectorAll(".dot")
			var textDarks = document.querySelectorAll(".historyText")

			const colorStart = 127

			const viewTop = document
				.querySelector(".handleScroll")
				.getBoundingClientRect().top
			// set gradient color for text
			for (var i = 0; i < dotDarks.length; i++) {
				var viewHeight =
					document.querySelector(".handleScroll").clientHeight
				var elementTop =
					textDarks[2 * i + 1].getBoundingClientRect().top
				var elementBottom =
					textDarks[2 * i + 1].getBoundingClientRect().bottom
				var elementVisible = viewHeight / 2
				var range = Math.abs(elementBottom - elementTop)
				var rightText = textDarks[2 * i + 1]
				var grad = Math.max(
					Math.min(
						viewHeight - elementVisible - elementTop + viewTop,
						range
					),
					0
				)
				var div = 1
				var r = ((255 / div - colorStart) * grad) / range + colorStart
				var g = ((255 / div - colorStart) * grad) / range + colorStart
				var b = ((255 / div - colorStart) * grad) / range + colorStart
				if (elementTop < viewHeight - elementVisible + viewTop) {
					dotDarks[i].style.backgroundColor = `rgb(${r},${g},${b})`
					textDarks[2 * i].style.color = `rgb(${r},${g},${b})`
					textDarks[2 * i + 1].style.color = `rgb(${r},${g},${b})`
					rightText.classList.add("fadeLeft")
				} else {
					dotDarks[
						i
					].style.backgroundColor = `rgb(${colorStart},${colorStart},${colorStart})`
					textDarks[
						2 * i
					].style.color = `rgb(${colorStart},${colorStart},${colorStart})`
					textDarks[
						2 * i + 1
					].style.color = `rgb(${colorStart},${colorStart},${colorStart})`
					rightText.classList.remove("fadeLeft")
				}
			}
		},
		initAttributes() {
			//Set time-line height
			const dots = document.querySelectorAll(".dot")
			const top = dots[0].getBoundingClientRect().top
			const bottom = dots[dots.length - 1].getBoundingClientRect().bottom
			const height = Math.abs(bottom - top)
			const extraSpace = 700
			document.getElementById("time-line").style.height =
				height + extraSpace + "px"
			document.getElementById("time-line-background").style.height =
				height + extraSpace + "px"
			document.getElementById("time-line-progress").style.height =
				height + extraSpace + "px"

			//Set time-line-progress-bar height and top
			const timeLineProgressBar = document.querySelector(
				".time-line-progress-bar"
			)
			const viewHeight =
				document.querySelector(".handleScroll").clientHeight
			const windowTop = document
				.querySelector(".handleScroll")
				.getBoundingClientRect().top
			timeLineProgressBar.style.height = `${viewHeight / 2}px`
			timeLineProgressBar.style.top = `${windowTop}px`

			const endDiv = document.querySelector(".end")
			endDiv.style.height = `${viewHeight}px`
		},
	},
}
</script>
<style>
.handleScroll {
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
}
:root {
	--dot_size: 18px;
	--dot_size_outer: 8px;
	--time-line-width: 4px;
	--grid-margin: 100px;
	box-sizing: border-box;
}
html,
body {
	max-width: 100%;
	margin: 0;
	overflow: scroll;
}
</style>
<style scoped>
.start {
	/* background-image: url("images/space.jpeg"); */
	background-color: black;
	width: 100%;
	height: 500px;
	font-size: xx-large;
	color: white;
	text-align: center;
	border-style: none;
	left: 0;
	top: 0;
}
.nav_bar {
	width: 100%;
	height: 60px;
	background-color: black;
	position: fixed;
	z-index: 20;
	top: 0;
}
.space {
	width: 50px;
	height: 40px;
	background-color: black;
	float: right;
	padding-top: 20px;
}
.nav_bar_item {
	width: 100px;
	height: 40px;
	background-color: black;
	float: right;
	text-align: center;
	padding-top: 20px;
	font-size: large;
	color: white;
}
#indict_bar {
	height: 2px;
	width: 50px;
	background: linear-gradient(
		90deg,
		rgba(63, 94, 251, 1) 0%,
		rgba(252, 70, 107, 1) 100%
	);
	position: fixed;
	top: 50px;
	right: 250px;
	transform: translateX(-50%);
	transition: 0.5s ease-in-out;
}
.end {
	background-color: black;
	width: 100%;
	position: relative;
}

#time-line {
	width: 100%;
	background-color: none;
	border-style: none;
	position: relative;
}
#time-line-background {
	/* background-image: url("images/space.jpeg"); */
	background-repeat: repeat-y;
	background-color: black;
	position: absolute;
	width: 100%;
	z-index: -4;
}
.container {
	position: relative;
}
#time-line-progress {
	width: var(--time-line-width);
	background: rgba(127, 127, 127, 1);
	border-style: none;
	position: absolute;
	left: calc(50% - var(--time-line-width) / 2);
	z-index: -3;
}
.time-line-progress-bar {
	/* height: 50vh; */
	width: var(--time-line-width);
	background: linear-gradient(
		180deg,
		rgba(64, 201, 255, 1) 0%,
		rgba(232, 28, 255, 1) 100%
	);
	border-style: none;
	position: fixed;
	/* top: 130px; */
	left: calc(50% - var(--time-line-width) / 2);
	z-index: -1;
}
.grid {
	padding-top: var(--grid-margin);
	display: grid;
	width: 80%;
	height: fit-content;
	margin-left: auto;
	margin-right: auto;
	border-style: none;

	grid-template-columns: [column_1] 0.5fr [column_2] 200px [column_3] 0.5fr [column_4];
	grid-template-rows: [row_1] 1fr [row_2];
}

.time-line-left {
	border-style: none;
	grid-column: 1/2;
	grid-row: 1/2;
}
.time-line-right {
	border-style: none;
	grid-column: 3/4;
	grid-row: 1/2;
}
.time-line-dot {
	border-style: none;
	grid-column: 2/3;
	grid-row: 1/2;
	position: relative;
}
.dot {
	width: var(--dot_size);
	height: var(--dot_size);
	border-radius: 50%;
	border-width: var(--dot_size_outer);
	border-style: solid;
	left: calc(50% - var(--dot_size) / 2 - var(--dot_size_outer));
	position: sticky;
	top: 50%;
	z-index: -2;
	background-color: rgba(127, 127, 127, 1);
	border-color: black;
}
.time-line-left-text {
	font-size: x-large;
	font-family: "Courier New", Courier, monospace;
	font-weight: bold;
	text-align: right;
	position: sticky;
	top: 50%;
}
.time-line-right-text {
	font-size: medium;
	font-family: "Courier New", Courier, monospace;
	opacity: 0;
}
.time-line-left.historyText {
	color: rgba(127, 127, 127, 0.8);
}
.time-line-right.historyText {
	color: black;
}
.fadeLeft {
	opacity: 1;
	animation: fade-left 1s ease-in-out;
}

@keyframes fade-left {
	0% {
		transform: translateX(-100px);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}

.president {
	font-size: large;
	font-family: "Courier New", Courier, monospace;
	font-weight: 600;
}
a {
	color: inherit;
}
.title-text {
	font-size: xx-large;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-weight: bold;
	color: white;
	text-align: center;
	padding-top: 250px;
}
.cover-up {
	width: 100%;
	height: var(--grid-margin);
	position: absolute;
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 1) 100%
	);
	border-style: none;
}
.cover-down {
	width: 100%;
	height: var(--grid-margin);
	position: absolute;
	bottom: 0;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 1) 100%
	);
	border-style: none;
}
a {
	color: inherit;
	text-decoration: none;
}
</style>
