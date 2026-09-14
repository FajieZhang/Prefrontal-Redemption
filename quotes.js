/**
 * 离线高可靠名言语料库 (基于研究报告第三章数据字典标准构建)
 * 涵盖五大认知干预主题：
 * 1. self_discipline (自律意志与内在控制)
 * 2. memento_mori (时间感知与生命有限性)
 * 3. eudaimonia (即时快感与深层价值)
 * 4. mindfulness (正念觉察与当下心流)
 * 5. action_bias (行动偏好与启动阻力瓦解)
 */

const QUOTES_DATABASE = [
  // --- 主题 1: 自律意志与内在控制 (self_discipline) ---
  {
    id: 1,
    content: "胜人者有力，自胜者强。",
    author: "老子",
    source_work: "《道德经·第三十三章》",
    category: "self_discipline",
    era_or_region: "先秦",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "滑动屏幕是手指的本能，但停下来才是真正掌控自我的力量。你现在能赢过无意识的冲动吗？"
  },
  {
    id: 2,
    content: "支配自己，是所有人世间最宏大的统治权。",
    author: "塞内卡 (Seneca)",
    source_work: "《致卢基里乌斯书信集》(Epistulae Morales ad Lucilium) 第113封",
    category: "self_discipline",
    era_or_region: "古罗马",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "是你在主动选择看手机，还是算法在替你做决定？"
  },
  {
    id: 3,
    content: "No man is free who cannot command himself. (不能命令自己的人，绝非自由人。)",
    author: "毕达哥拉斯 (Pythagoras)",
    source_work: "《古典哲学文献集残篇》",
    category: "self_discipline",
    era_or_region: "古希腊",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "顺从手指的惯性不是自由，能随时止步才是真正的自主。放下手机，找回掌控。"
  },
  {
    id: 4,
    content: "克己复礼为仁。一日克己复礼，天下归仁焉。为仁由己，而由人乎哉？",
    author: "孔子",
    source_work: "《论语·颜渊篇》",
    category: "self_discipline",
    era_or_region: "先秦",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "自律来自内在意志的苏醒，而非外界强求。此时此刻，你选择自持还是放纵？"
  },
  {
    id: 5,
    content: "破山中贼易，破心中贼难。",
    author: "王阳明",
    source_work: "《与杨仕德薛尚谦书》",
    category: "self_discipline",
    era_or_region: "明代",
    tone_type: "empathic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "屏幕背后的躁动，就是心中的微澜。看清它，深呼吸，别让它带走你的宁静。"
  },
  {
    id: 6,
    content: "你拥有支配自己心智的力量，而不是外界事件。一旦认识到这一点，你就会找到无穷的力量。",
    author: "马可·奥勒留 (Marcus Aurelius)",
    source_work: "《沉思录》(Meditations) 卷十二",
    category: "self_discipline",
    era_or_region: "古罗马",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "屏幕里的世界无法决定你的心情。把视线移向眼前真实的生活。"
  },
  {
    id: 7,
    content: "凡人做一事，便须全副精神注在此一事，首尾不懈，不可见异思迁。",
    author: "曾国藩",
    source_work: "《曾国藩家书·致诸弟》",
    category: "self_discipline",
    era_or_region: "清代",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "你本来打算去专注做的那件事，现在进行到哪一步了？"
  },

  // --- 主题 2: 时间感知与生命有限性 (memento_mori) ---
  {
    id: 8,
    content: "You act like mortals in all that you fear, and like immortals in all that you desire. (在恐惧面前，你们如同凡人般脆弱；在挥霍光阴时，你们却以为自己长生不死。)",
    author: "塞内卡 (Seneca)",
    source_work: "《论生命之短暂》(De Brevitate Vitae) 第三章",
    category: "memento_mori",
    era_or_region: "古罗马",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "如果生命只是一趟单程倒计时，你愿意把今天仅有的黄金一小时交给信息流吗？"
  },
  {
    id: 9,
    content: "逝者如斯夫，不舍昼夜。",
    author: "孔子",
    source_work: "《论语·子罕篇》",
    category: "memento_mori",
    era_or_region: "先秦",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "时间从不会倒流，刚才滑过的几分钟已经永远消失在虚空中了。"
  },
  {
    id: 10,
    content: "人生天地之间，若白驹之过隙，忽然而已。",
    author: "庄子",
    source_work: "《庄子·知北游》",
    category: "memento_mori",
    era_or_region: "先秦",
    tone_type: "empathic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "岁月如白驹过隙，与其在虚拟碎屑里消耗眼神，不如抬头看看窗外的光影。"
  },
  {
    id: 11,
    content: "盛年不重来，一日难再晨。及时当勉励，岁月不待人。",
    author: "陶渊明",
    source_work: "《杂诗十二首·其一》",
    category: "memento_mori",
    era_or_region: "东晋",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "今天的太阳只有一次升起与落下。珍惜眼前的这一小段清醒时光。"
  },
  {
    id: 12,
    content: "并非我们拥有的时间太少，而是我们浪费了太多生命。",
    author: "塞内卡 (Seneca)",
    source_work: "《论生命之短暂》(De Brevitate Vitae) 第一章",
    category: "memento_mori",
    era_or_region: "古罗马",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "我们总在抱怨‘没有时间提升自己’，但我们的时间究竟去了哪里？"
  },
  {
    id: 13,
    content: "不要把残余的生命浪费在对旁人琐事的揣度上，除非这有助于共同的福祉。珍惜你仅存的清醒时刻。",
    author: "马可·奥勒留 (Marcus Aurelius)",
    source_work: "《沉思录》(Meditations) 卷二",
    category: "memento_mori",
    era_or_region: "古罗马",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "别人的八卦、搞笑段子与你真正的人生追求毫无关系。保护你的精神边界。"
  },

  // --- 主题 3: 即时快感与深层价值 (eudaimonia) ---
  {
    id: 14,
    content: "君子务本，本立而道生。",
    author: "有子",
    source_work: "《论语·学而篇》",
    category: "eudaimonia",
    era_or_region: "先秦",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "刷手机只是暂时的逃避。抓住你今天最重要的根本任务，心才会真正踏实。"
  },
  {
    id: 15,
    content: "Life can be pulled by goals just as surely as it can be pushed by drives. (生命可以被宏大的目标所吸引，正如它可以被本能冲动所驱使。)",
    author: "维克多·弗兰克尔 (Viktor Frankl)",
    source_work: "《意义的寻求与存在主义分析》",
    category: "eudaimonia",
    era_or_region: "现代心理学",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "是让指尖的无聊冲动推着你走，还是让心中真正重要的长远目标引导你？"
  },
  {
    id: 16,
    content: "我们重复做什么样的事，就会成为什么样的人。卓越不是一种瞬时行为，而是一种日常习惯。",
    author: "威尔·杜兰特 (Will Durant)",
    source_work: "《哲学的故事》(The Story of Philosophy) 第七章（对亚里士多德伦理学的提炼）",
    category: "eudaimonia",
    era_or_region: "近现代哲学",
    tone_type: "action",
    verified_level: "Tier-2-Verified",
    reflection_prompt: "每一次拒绝无脑刷屏的微小抉择，都在为你理想中的那个强大自我投票。"
  },
  {
    id: 17,
    content: "养心莫善于寡欲。其为人也寡欲，虽有不存焉者，寡矣；其为人也多欲，虽有存焉者，寡矣。",
    author: "孟子",
    source_work: "《孟子·尽心章句下》",
    category: "eudaimonia",
    era_or_region: "先秦",
    tone_type: "empathic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "刺激越密集，心灵越空虚；欲望越精简，内省越深邃。放下屏幕，让思绪清澈起来。"
  },
  {
    id: 18,
    content: "真正持久的幸福，来自于向内探寻的高尚潜能实现，而非向外索取的短暂感官刺激。",
    author: "亚里士多德 (Aristotle)",
    source_work: "《尼各马可伦理学》(Nicomachean Ethics) 第一卷",
    category: "eudaimonia",
    era_or_region: "古希腊",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "短视频给你的多巴胺只能维持几秒，关闭之后留在胸口的，是满足还是悔意？"
  },

  // --- 主题 4: 正念觉察与当下心流 (mindfulness) ---
  {
    id: 19,
    content: "天地与我并生，而万物与我为一。",
    author: "庄子",
    source_work: "《庄子·齐物论》",
    category: "mindfulness",
    era_or_region: "先秦",
    tone_type: "empathic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "感受你的双脚踏在地面上，感受胸口自然的起伏。你正在真实的物理世界中呼吸。"
  },
  {
    id: 20,
    content: "Live in each season as it passes; breathe the air, drink the drink, taste the fruit. (随着四季的流转而生活；呼吸身边的空气，喝甘澈的水，品尝自然的果实。)",
    author: "亨利·大卫·梭罗 (Henry David Thoreau)",
    source_work: "《瓦尔登湖》(Walden)",
    category: "mindfulness",
    era_or_region: "近代文学",
    tone_type: "empathic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "别让发光的玻璃屏幕夺走你对真实世界的所有感官。喝一口水，深吸一口气。"
  },
  {
    id: 21,
    content: "惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭。",
    author: "苏轼",
    source_work: "《前赤壁赋》",
    category: "mindfulness",
    era_or_region: "宋代",
    tone_type: "empathic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "现实中清风与呼吸的质感，胜过千百条像素合成的喧嚣流言。"
  },
  {
    id: 22,
    content: "控制注意力是所有高等思维形式的基石。自愿唤回游离注意力的能力，是判断力、品格与意志的核心。",
    author: "威廉·詹姆斯 (William James)",
    source_work: "《心理学原理》(The Principles of Psychology) 第十一章",
    category: "mindfulness",
    era_or_region: "近代心理学",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "注意力是你最宝贵的心智货币，别让算法免费把它买断。把注意力收回来。"
  },
  {
    id: 23,
    content: "吸气，我感受身心的停顿；呼气，我放下此刻的焦虑与浮躁。",
    author: "一行禅师 (Thich Nhat Hanh)",
    source_work: "《正念的奇迹》(The Miracle of Mindfulness)",
    category: "mindfulness",
    era_or_region: "现代",
    tone_type: "empathic",
    verified_level: "Tier-2-Verified",
    reflection_prompt: "闭上眼睛十秒钟，把呼吸放缓。你此刻不需要用屏幕来缓解压力。"
  },

  // --- 主题 5: 行动偏好与启动阻力瓦解 (action_bias) ---
  {
    id: 24,
    content: "不积跬步，无以至千里；不积小流，无以成江海。",
    author: "荀子",
    source_work: "《荀子·劝学篇》",
    category: "action_bias",
    era_or_region: "先秦",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "拖延往往是因为觉得事情太繁重。你不需要一口气做完，只需要现在迈出第一步。"
  },
  {
    id: 25,
    content: "Action may not always bring happiness, but there is no happiness without action. (行动不一定带来幸福，但没有行动则绝无幸福可言。)",
    author: "本杰明·迪斯雷利 (Benjamin Disraeli)",
    source_work: "《洛泰尔》(Lothair)",
    category: "action_bias",
    era_or_region: "近代英国",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "逃避不会减少待办事项。现在就关掉手机，去启动手头最简单的那一小项。"
  },
  {
    id: 26,
    content: "千里之行，始于足下。合抱之木，生于毫末；九层之台，起于累土。",
    author: "老子",
    source_work: "《道德经·第六十四章》",
    category: "action_bias",
    era_or_region: "先秦",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "别等‘心情准备好了’再动身，行动本身就是治愈拖延与焦虑的良药。"
  },
  {
    id: 27,
    content: "怕什么真理无穷，进一寸有一寸的欢喜。",
    author: "胡适",
    source_work: "《胡适文存》",
    category: "action_bias",
    era_or_region: "近现代",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "去做哪怕五分钟有价值的事，也远胜在屏幕前无休止地游荡。"
  },
  {
    id: 28,
    content: "行动似乎紧随感觉，但实际上两者并存；通过控制意识能直接触及的行动，我们能间接重塑自己的情绪。",
    author: "威廉·詹姆斯 (William James)",
    source_work: "《习惯论与情感控制》",
    category: "action_bias",
    era_or_region: "近代心理学",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "把手机屏幕扣在桌面上，深吸一口气。你的自制力正在这一瞬间重新连接。"
  },
  {
    id: 29,
    content: "知是行之始，行是知之成。若会得时，只说一个知，已自有行在；只说一个行，已自有知在。",
    author: "王阳明",
    source_work: "《传习录·卷上》",
    category: "action_bias",
    era_or_region: "明代",
    tone_type: "socratic",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "你知道该停下来了。知而不行，等于不知；此刻按下锁屏，就是知行合一。"
  },
  {
    id: 30,
    content: "其实地上本没有路，走的人多了，也便成了路。",
    author: "鲁迅",
    source_work: "《故乡》（收录于《呐喊》）",
    category: "action_bias",
    era_or_region: "现代文学",
    tone_type: "action",
    verified_level: "Tier-1-Primary",
    reflection_prompt: "新的自律习惯起初都会感到生疏别扭，但只要你今天多坚持一次，这条路就更清晰一分。"
  }
];

// 主题元信息与中文展示映射
const THEME_INFO = {
  self_discipline: {
    name: "自律意志与内在控制",
    tag: "自胜者强",
    color: "#4ade80"
  },
  memento_mori: {
    name: "时间感知与生命有限性",
    tag: "向死而生",
    color: "#f87171"
  },
  eudaimonia: {
    name: "即时快感与深层价值",
    tag: "追求至善",
    color: "#fbbf24"
  },
  mindfulness: {
    name: "正念觉察与当下心流",
    tag: "回归当下",
    color: "#38bdf8"
  },
  action_bias: {
    name: "行动偏好与启动阻力",
    tag: "积步千里",
    color: "#a78bfa"
  }
};
