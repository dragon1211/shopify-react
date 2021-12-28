import React, { FC } from "react";
import {
  ChakraProvider,
  Box,
  BoxProps,
  VStack,
  Image,
  Text,
  TextProps,
  Flex,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EntryPoint } from "../../components/EntryPoint";
import about_theme from "../../styles/about_theme";
import ChatBubble from "../../components/chatBubble";
import {
  FirstIcon,
  SecondIcon,
  ThirdIcon,
} from "../../components/icons/top/topPointSection/numberIcon";
import {
  FirstPic,
  SecondPic,
  ThirdPic,
} from "../../components/icons/top/topPointSection/pic";
import PrimaryButton from "../../components/primaryButton";

/**
 * @desc THE HERO SECTION
 */
const Hero = () => {
  const url = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_hero_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_hero_pc.png",
  });
  return (
    <Box pt={{ base: "75px", md: "72px" }} w="100%" maxW="1280" margin="auto">
      <Image
        w="100vw"
        objectFit="cover"
        src={url}
        fallbackSrc={url}
        alt={url}
      />
    </Box>
  );
};
/**
 * @desc THE CONTAINER FOR ALL SECTION
 */
const ContainerSection: FC = ({ children }) => (
  <Box px={{ base: "30px", md: "40px" }}>
    <VStack>
      <Box
        w="100%"
        maxW="1200px"
        m="auto"
        pl={{ base: "0", md: "9.3vw", xl: "120px" }}
        pr={{ base: "0", md: "9.3vw", xl: "120px" }}
      >
        {children}
      </Box>
    </VStack>
  </Box>
);

/**
 * @desc THE TOP TITLE SECTION
 */
interface TopTitleProps {
  title: string;
  subtitle: string;
  boxProps?: BoxProps;
}
const TopTitle: FC<TopTitleProps> = ({ title, subtitle, boxProps }) => {
  return (
    <Box
      display={{ base: "block", md: "flex" }}
      alignItems={{ base: "none", md: "flex-end" }}
      {...boxProps}
    >
      <Text
        variant="primary"
        fontFamily={"Nort"}
        fontSize={{ base: "40px", md: "50px" }}
        whiteSpace="nowrap"
      >
        {title}
      </Text>
      <Text
        fontSize={{ base: "15px", md: "16px" }}
        pb="15px"
        mt={{ base: "8px", md: "0px" }}
        ml={{ base: "0px", md: "40px" }}
        letterSpacing=".1em"
      >
        {subtitle}
      </Text>
    </Box>
  );
};

interface TopTitleDesc {
  desc: JSX.Element;
  descMobile: JSX.Element;
  boxProps?: BoxProps;
}
const TopTitleDesc: FC<TopTitleDesc> = ({ desc, descMobile, boxProps }) => {
  return (
    <Box {...boxProps}>
      <Text variant="topDescription" display={{ base: "none", md: "block" }}>
        {desc}
      </Text>
      <Text variant="topDescription" display={{ base: "block", md: "none" }}>
        {descMobile}
      </Text>
    </Box>
  );
};

/**
 * @desc THE ABOUT SECTION
 */
const ConceptSection1 = () => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con1_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con1_title_pc.png",
  });
  const header_img =
    "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con1_header.png";

  const middle_img =
    "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con1_middle.png";

  const bottom_img = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con_bottom_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con1_bottom_pc.png",
  });

  return (
    <>
      <TopTitle
        title="CONCEPT"
        subtitle="ブランドに込めた想い"
        boxProps={{ pt: "140px", mb: { base: "80px", md: "50px" } }}
      />
      <Image
        maxW={{ base: "241px", md: "369px" }}
        w="100%"
        src={title}
        fallbackSrc={title}
        alt="休養と栄養を届ける"
      />
      <Flex
        mt={{ base: "", md: "15px" }}
        direction={{ base: "column-reverse", md: "row" }}
        justifyContent={{ base: "", md: "center" }}
        alignItems={"center"}
      >
        <Box
          mt={{ base: "80px", md: "30px" }}
          pr={{ base: "0", md: "40px" }}
          w={{ base: "", md: "50%" }}
          position={"relative"}
        >
          <Box>
            <TopTitleDesc
              desc={
                <>
                  ママの休食の「休食」という言葉には、
                  <br />
                  「休む（適度な栄養をとる）こと」と <br />
                  「給食のような栄養バランスのとれた食事をとること」の
                  ２つの意味がこめられています。 <br />
                  <br />
                  新しい生命を育み・産み出す性である
                  <br />
                  女性（ママ）には、
                  <br />
                  栄養バランスのとれた食事と
                  <br />
                  適度な休養が必要です。
                </>
              }
              descMobile={
                <>
                  ママの休食の「休食」という言葉には、
                  「休む（適度な栄養をとる）こと」と
                  「給食のような栄養バランスのとれた食事をとること」の
                  ２つの意味がこめられています。 <br />
                  <br />
                  新しい生命を育み・産み出す性である 女性（ママ）には、
                  栄養バランスのとれた食事と 適度な休養が必要です。
                </>
              }
            />
            <Box
              h={{ base: "160px", md: "35px" }}
              position={"relative"}
              display={"flex"}
              justifyContent={{ base: "center", md: "none" }}
            >
              <Image
                maxW={{ base: "47px", md: "65px" }}
                w="100%"
                src={middle_img}
                fallbackSrc={middle_img}
                alt={middle_img}
                position={"absolute"}
                right={{ base: "initial", md: "-40px" }}
                bottom={{ base: "20px", md: "-25px" }}
              />
            </Box>
            <TopTitleDesc
              desc={
                <>
                  休養と栄養をたっぷりとった元気なママは、
                  <br />
                  家族の健康のみなもとであり、
                  <br />
                  私たちは、そんなママやご家族に寄り添う
                  <br />
                  サービスでありたいと考えています。
                </>
              }
              descMobile={
                <>
                  休養と栄養をたっぷりとった元気なママは、
                  家族の健康のみなもとであり、
                  私たちは、そんなママやご家族に寄り添う
                  サービスでありたいと考えています。
                </>
              }
            />
          </Box>
        </Box>
        <Box
          mt={{ base: "77px", md: "0" }}
          w={{ base: "100%", md: "50%" }}
          display={"flex"}
          justifyContent={{ base: "center", md: "right" }}
        >
          <Image
            h={{ base: "auto" }}
            maxWidth={{ base: "222px", md: "378px" }}
            w={"100%"}
            src={header_img}
            fallbackSrc={header_img}
            alt={header_img}
          />
        </Box>
      </Flex>
      <Box
        mt={{ base: "153px", md: "82px" }}
        mb={{ base: "105px", md: "92px" }}
        display="flex"
        justifyContent="center"
      >
        <Image
          maxW={{ base: "190px", md: "254px" }}
          w="100%"
          src={bottom_img}
          fallbackSrc={bottom_img}
          alt={bottom_img}
        />
      </Box>
    </>
  );
};

const ConceptSection2 = () => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con2_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con2_title_pc.png",
  });
  const header_img =
    "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con2_header.png";

  const middle_img =
    "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con2_middle.png";

  const bottom_img = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con_bottom_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con2_bottom_pc.png",
  });

  return (
    <>
      <Image
        maxW={{ base: "239px", md: "375px" }}
        w="100%"
        src={title}
        fallbackSrc={title}
        alt="ご家族の健やかな暮らしをサポートするラインナップ"
        display={{ base: "block", md: "none" }}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={{ base: "", md: "center" }}
        alignItems={"center"}
      >
        <Box
          mt={{ base: "80px", md: "0" }}
          w={{ base: "100%", md: "50%" }}
          display={"flex"}
          justifyContent={{ base: "center", md: "left" }}
        >
          <Image
            h={{ base: "auto" }}
            maxW={{ base: "271px", md: "468px" }}
            w={"100%"}
            src={header_img}
            fallbackSrc={header_img}
            alt={header_img}
          />
        </Box>
        <Box
          pl={{ base: "0", md: "40px" }}
          w={{ base: "", md: "50%" }}
          position={"relative"}
        >
          <Box>
            <Image
              maxW={{ base: "239px", md: "375px" }}
              w="100%"
              src={title}
              fallbackSrc={title}
              alt="ご家族の健やかな暮らしをサポートするラインナップ"
              display={{ base: "none", md: "block" }}
            />
            <TopTitleDesc
              boxProps={{
                mt: { base: "80px", md: "136px" },
                position: "relative",
              }}
              desc={
                <>
                  葉酸や鉄分の不足が気になる
                  <br />
                  ママになる前の栄養補給には、
                  <br />
                  お弁当やサプリメント。
                  <br />
                  <br />
                  毎日忙しい子育て期には、
                  <br />
                  ご家族の健康を考えたお惣菜やスイーツ。
                  <br />
                  お子さまが毎日食べるおやつだって、
                  <br />
                  安全性に配慮した上質なものを食べてほしい。
                </>
              }
              descMobile={
                <>
                  葉酸や鉄分の不足が気になる ママになる前の栄養補給には、
                  お弁当やサプリメント。
                  <br />
                  <br />
                  毎日忙しい子育て期には、
                  ご家族の健康を考えたお惣菜やスイーツ。
                  お子さまが毎日食べるおやつだって、
                  安全性に配慮した上質なものを食べてほしい。
                </>
              }
            />
            <Box
              h={{ base: "195px", md: "35px" }}
              position={{ base: "relative", md: "initial" }}
              display={"flex"}
              justifyContent={{ base: "center", md: "none" }}
            >
              <Image
                maxW={{ base: "81px", md: "129px" }}
                w="100%"
                src={middle_img}
                fallbackSrc={middle_img}
                alt={middle_img}
                position={"absolute"}
                top={{ base: "initial", md: "50%" }}
                transform={{ base: "initial", md: "translateY(-50%)" }}
                right={{ base: "initial", md: "0" }}
                bottom={{ base: "20px", md: "-25px" }}
              />
            </Box>
            <TopTitleDesc
              desc={
                <>
                  女性を取り巻く環境、
                  <br />
                  生活の中のさまざまな
                  <br />
                  悩みに合わせた商品展開で、
                  <br />
                  あなたの健やかな暮らしをサポートします。
                  <br />
                </>
              }
              descMobile={
                <>
                  女性やご家族を取り巻く環境、 生活の中のさまざまな
                  悩みに合わせた商品展開で、
                  あたなの健やかな暮らしをサポートします。
                </>
              }
            />
          </Box>
        </Box>
      </Flex>
      <Box
        mt={{ base: "178px", md: "80px" }}
        mb={{ base: "107px", md: "80px" }}
        display="flex"
        justifyContent="center"
      >
        <Image
          maxW={{ base: "190px", md: "254px" }}
          w="100%"
          src={bottom_img}
          fallbackSrc={bottom_img}
          alt={bottom_img}
        />
      </Box>
    </>
  );
};

const ConceptSection3 = () => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con3_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con3_title_pc.png",
  });
  const header_img =
    "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con3_header.png";

  const middle_img =
    "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con3_middle.png";

  const bottom_img = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con_bottom_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con1_bottom_pc.png",
  });

  return (
    <>
      <Image
        maxW={{ base: "136px", md: "206px" }}
        w="100%"
        src={title}
        fallbackSrc={title}
        alt="ロゴマークにこめた想い"
        display={{ base: "block", md: "none" }}
      />
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        justifyContent={{ base: "", md: "center" }}
        alignItems={"center"}
      >
        <Box
          mt={{ base: "80px", md: "30px" }}
          pr={{ base: "0", md: "40px" }}
          w={{ base: "", md: "50%" }}
          position={"relative"}
        >
          <Image
            maxW={{ base: "136px", md: "206px" }}
            w="100%"
            src={title}
            fallbackSrc={title}
            display={{ base: "none", md: "block" }}
            alt="ロゴマークにこめた想い"
          />

          <Image
            maxW={74}
            w="100%"
            src={middle_img}
            fallbackSrc={middle_img}
            alt={middle_img}
            position={"absolute"}
            right={125}
            top={70}
            display={{ base: "none", md: "block" }}
          />

          <TopTitleDesc
            boxProps={{
              mt: { base: "0px", md: "75px" },
            }}
            desc={
              <>
                １食の中に栄養素がたくさん
                <br />
                詰まっていることを表現するために、
                <br />
                彩り豊かな幾何学図形のマークを
                <br />
                デザインしました。
                <br />
                <br />
                マークは漢字の「休」の文字をかたどり、
                <br />
                ママの休食が、ママそしてご家族に
                <br />
                休養と栄養を届けるサービスであることを
                <br />
                表しています。
                <br />
                <br />
                私たちは、国旗にも見えるこのマークを、
                <br />
                子育てカルチャーの次世代スタンダードを示す
                <br />
                旗印にしていきます。
              </>
            }
            descMobile={
              <>
                １食の中に栄養素がたくさん 詰まっていることを表現するために、
                彩り豊かな幾何学図形のマークを デザインしました。
                <br />
                <br />
                マークは漢字の「休」の文字をかたどり、
                ママの休食が、ママそしてご家族に
                休養と栄養を届けるサービスであることを 表しています。
                <br />
                <br />
                私たちは、国旗にも見えるこのマークを、
                子育てカルチャーの次世代スタンダードを示す 旗印にしていきます。
              </>
            }
          />
        </Box>
        <Box
          mt={{ base: "85px", md: "0" }}
          pl={{ base: "0px", md: "40px" }}
          w={{ base: "100%", md: "50%" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Image
            h={{ base: "auto" }}
            maxWidth={{ base: "233.33px", md: "300px" }}
            w={"100%"}
            src={header_img}
            fallbackSrc={header_img}
            alt={header_img}
          />
        </Box>
      </Flex>
      <Box
        mt={{ base: "140px", md: "73px" }}
        mb={{ base: "112.5px", md: "92px" }}
        display="flex"
        justifyContent="center"
      >
        <Image
          maxW={{ base: "190px", md: "254px" }}
          w="100%"
          src={bottom_img}
          fallbackSrc={bottom_img}
          alt={bottom_img}
        />
      </Box>
    </>
  );
};

const ConceptSection4 = () => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con4_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con4_title_pc.png",
  });
  const bottom_img = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con4_bottom_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_con4_bottom_pc.png",
  });

  return (
    <>
      <Image
        maxW={{ base: "264px", md: "462px" }}
        w="100%"
        src={title}
        fallbackSrc={title}
        alt="ママの休食はママを通じてご家族の健康を支えたい"
      />
      <Text variant={"topDescription"} mt={{ base: "77px", md: "75px" }}>
        ママの休食では、若年女性の低体重や妊産婦の低栄養、
        低出生体重児の割合の高さなどの日本の健康問題・社会課題に目を向け、
        「ママに休養と栄養を届ける」ことをテーマに、サービスを展開してまいりました。{" "}
        <br />
        <br />
        しかし、多くの方にママの休食をご利用いただく中で、
        プレママや育児ママという女性のライフステージだけでなく、
        「ご家族」というライフステージにも休養と栄養の大きな課題があると気づきました。{" "}
        <br />
        <br />
        ママの休食は「手抜きの手段」ではなく、
        「休養も栄養も補給できる賢い選択肢の一つ」となって、
        プレママ→育児ママ→ご家族へと変化するライフステージに合わせて、
        よりよいサービスの提供に努めてまいります。
      </Text>
      <Box
        mt={{ base: "153px", md: "213px" }}
        mb={{ base: "178px", md: "256px" }}
        display="flex"
        justifyContent="center"
      >
        <Image
          maxW={{ base: "276px", md: "482px" }}
          w="100%"
          src={bottom_img}
          fallbackSrc={bottom_img}
          alt={bottom_img}
        />
      </Box>
    </>
  );
};

interface MessageItemProps {
  boxProps?: BoxProps;
}

const MessageItem1: FC<MessageItemProps> = ({ boxProps }) => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg1_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg1_title_pc.png",
  });
  const pic = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg1_pic_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg1_pic_pc.png",
  });

  return (
    <Box {...boxProps} position={"relative"}>
      <Box
        position={{ base: "relative", md: "absolute" }}
        top={{ base: "0", md: "-110px" }}
      >
        <Image
          maxW={{ base: "237px", md: "361px" }}
          w="100%"
          src={title}
          fallbackSrc={title}
          alt="実は身近な女性の低栄養問題"
        />
      </Box>
      <Box
        mt={{ base: "40px", md: "110px" }}
        display={"flex"}
        justifyContent={{ base: "left", md: "right" }}
      >
        <Box maxW={"830px"} w="100%">
          <Image
            maxW={{ base: "311px", md: "830px" }}
            w="100%"
            src={pic}
            fallbackSrc={pic}
            alt="実は身近な女性の低栄養問題"
          />
          <TopTitleDesc
            boxProps={{
              mt: "50px",
            }}
            desc={
              <>
                日本は、他の先進国と比較して低出生体重児の割合が高く、 <br />
                その原因の一つとして若い世代の女性や妊婦の低栄養の問題が指摘されています。
                <br />
                これは日本の重要な社会課題です。
              </>
            }
            descMobile={
              <>
                日本は、他の先進国と比較して低出生体重児の割合が高く、
                その原因の一つとして若い世代の女性や妊婦の低栄養の問題が指摘されています。
                <br />
                これは日本の重要な社会課題です。
              </>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const MessageItem2: FC<MessageItemProps> = ({ boxProps }) => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg2_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg2_title_pc.png",
  });
  const pic = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg2_pic_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg2_pic_pc.png",
  });

  return (
    <Box {...boxProps} position={"relative"}>
      <Box
        position={{ base: "relative", md: "absolute" }}
        top={{ base: "0", md: "-110px" }}
      >
        <Image
          maxW={{ base: "242px", md: "609px" }}
          w="100%"
          src={title}
          fallbackSrc={title}
          alt="自由でゆとりのある時間を増やし
                家族や自身のために還元する"
        />
      </Box>
      <Box
        mt={{ base: "40px", md: "110px" }}
        display={"flex"}
        justifyContent={{ base: "left", md: "right" }}
      >
        <Box maxW={"830px"} w="100%">
          <Image
            maxW={{ base: "311px", md: "830px" }}
            w="100%"
            src={pic}
            fallbackSrc={pic}
            alt="実は身近な女性の低栄養問題"
          />
          <TopTitleDesc
            boxProps={{
              mt: "50px",
            }}
            desc={
              <>
                家事、とくに炊事を担うということは、家族の健康を担うということ。{" "}
                <br />
                だからこそ、その担い手となるパパ・ママには、手作り家庭料理に固執することなく、{" "}
                <br />
                外食や中食・外注などを含む幅広い選択肢の中で、自分自身にとっても家族にとっても、{" "}
                <br />
                よりヘルシーな（健康的な）選択をしてほしいと願っています。
                <br />
                <br />
                ママの休食は“手間抜きの手段”ではなく、“賢い選択肢の一つ”となって、{" "}
                <br />
                ママそしてご家族に寄り添い続けます。
              </>
            }
            descMobile={
              <>
                家事、とくに炊事を担うということは、家族の健康を担うということ。{" "}
                <br />
                だからこそ、その担い手となるパパ・ママには、手作り家庭料理に固執することなく、
                外食や中食・外注などを含む幅広い選択肢の中で、自分自身にとっても家族にとっても、{" "}
                <br />
                よりヘルシーな（健康的な）選択をしてほしいと願っています。
                <br />
                <br />
                ママの休食は“手間抜きの手段”ではなく、“賢い選択肢の一つ”となって、{" "}
                <br />
                ママそしてご家族に寄り添い続けます。
              </>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const MessageItem3: FC<MessageItemProps> = ({ boxProps }) => {
  const title = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg3_title_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg3_title_pc.png",
  });
  const pic = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg3_pic_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg3_pic_pc.png",
  });

  return (
    <Box {...boxProps} position={"relative"}>
      <Box
        position={{ base: "relative", md: "absolute" }}
        top={{ base: "0", md: "-110px" }}
      >
        <Image
          maxW={{ base: "262px", md: "400px" }}
          w="100%"
          src={title}
          fallbackSrc={title}
          alt="プロダクトは
                お客様と共創するもの"
        />
      </Box>
      <Box
        mt={{ base: "40px", md: "110px" }}
        display={"flex"}
        justifyContent={{ base: "left", md: "right" }}
      >
        <Box maxW={"830px"} w="100%">
          <Image
            maxW={{ base: "311px", md: "830px" }}
            w="100%"
            src={pic}
            fallbackSrc={pic}
            alt="実は身近な女性の低栄養問題"
          />
          <TopTitleDesc
            boxProps={{
              mt: "50px",
            }}
            desc={
              <>
                お客様とともに事業をつくる「共創」はママの休食のテーマのひとつです。
                <br />
                ママの休食を利用してくださるご家族とともに <br />
                より良いプロダクトを作っていきたいと思います。
                <br />
              </>
            }
            descMobile={
              <>
                お客様とともに事業をつくる「共創」はママの休食のテーマのひとつです。
                <br />
                ママの休食を利用してくださるご家族とともに
                より良いプロダクトを作っていきたいと思います。
              </>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const Message = () => {
  const top = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg_top.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_msg_top.png",
  });
  return (
    <Box>
      <ContainerSection>
        <TopTitle title="MESSAGE" subtitle="ママの休食からのメッセージ" />
      </ContainerSection>
      <Flex justify={"center"} mt={{ base: "140px", md: "90px" }}>
        <Box w="1200px" position={"relative"}>
          <Flex
            w={"50%"}
            right={"0"}
            position={"absolute"}
            justify={{ base: "left", md: "center" }}
            top={{ base: "-100px", md: "-195px" }}
          >
            <Image
              maxW={{ base: "137px", md: "178px" }}
              w="100%"
              src={top}
              fallbackSrc={top}
              alt="ママの休食はママを通じてご家族の健康を支えたい"
            />
          </Flex>
          <ChatBubble
            boxProps={{
              pt: { base: "75px", md: "80px" },
              pb: { base: "110px", md: "170px" },
            }}
          >
            <MessageItem1 />
            <MessageItem2 boxProps={{ mt: { base: "150px", md: "190px" } }} />
            <MessageItem3 boxProps={{ mt: { base: "150px", md: "190px" } }} />
          </ChatBubble>
        </Box>
      </Flex>
    </Box>
  );
};

/**
 * @desc FINAL SECTION
 */
interface CTextProps {
  text: JSX.Element;
  textMobile: JSX.Element;
  textProps: TextProps;
}
const CText: FC<CTextProps> = ({ text, textMobile, textProps }) => {
  return (
    <>
      <Text
        variant="topDescription"
        display={{ base: "none", md: "block" }}
        {...textProps}
      >
        {text}
      </Text>
      <Text
        variant="topDescription"
        display={{ base: "block", md: "none" }}
        {...textProps}
      >
        {textMobile}
      </Text>
    </>
  );
};

const FinalSection = () => {
  const url = useBreakpointValue({
    base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_final_sp.png",
    md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about_final_pc.png",
  });

  const sns = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37.843"
          height="30.764"
          viewBox="0 0 37.843 30.764"
        >
          <path
            id="Path_294"
            data-name="Path 294"
            d="M491.667,7189.318a15.527,15.527,0,0,1-4.458,1.222,7.782,7.782,0,0,0,3.413-4.3,15.519,15.519,0,0,1-4.93,1.884,7.767,7.767,0,0,0-13.23,7.083,22.048,22.048,0,0,1-16-8.113,7.77,7.77,0,0,0,2.4,10.366,7.751,7.751,0,0,1-3.517-.971v.1a7.769,7.769,0,0,0,6.229,7.613,7.808,7.808,0,0,1-3.507.133,7.766,7.766,0,0,0,7.253,5.39,15.681,15.681,0,0,1-11.5,3.217,21.953,21.953,0,0,0,11.9,3.488c14.283,0,22.091-11.83,22.091-22.09,0-.333-.008-.67-.023-1a15.765,15.765,0,0,0,3.872-4.017Z"
            transform="translate(-453.824 -7185.669)"
            fill="#eb6860"
          />
        </svg>
      ),
      url: "",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <path
            id="Path_295"
            data-name="Path 295"
            d="M536.667,7201.163a20.237,20.237,0,0,0,16.667,19.888v-14.445h-5v-5.555h5v-4.445c0-5,3.221-7.776,7.778-7.776a30.1,30.1,0,0,1,4.443.443v5.112H563c-2.445,0-3,1.221-3,2.778v3.888h5.334l-.889,5.555H560v14.445a20.129,20.129,0,1,0-23.333-19.888Z"
            transform="translate(-536.667 -7181.051)"
            fill="#eb6860"
            fillRule="evenodd"
          />
        </svg>
      ),
      url: "",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36.667"
          height="36.667"
          viewBox="0 0 36.667 36.667"
        >
          <path
            id="Path_296"
            data-name="Path 296"
            d="M651.514,7193.034a2.227,2.227,0,1,0-1.562.608A2.232,2.232,0,0,0,651.514,7193.034Zm-18.177,1.357a9.424,9.424,0,1,1-2.76,6.663A9.428,9.428,0,0,1,633.337,7194.391Zm4.322,12.315a6.115,6.115,0,1,0-2.191-1.544A6.117,6.117,0,0,0,637.659,7206.706Zm9.75-20.575c-1.934-.088-2.514-.107-7.409-.107s-5.475.019-7.408.107a10.134,10.134,0,0,0-3.4.632,6.053,6.053,0,0,0-3.478,3.478,10.132,10.132,0,0,0-.632,3.4c-.088,1.933-.107,2.513-.107,7.408s.019,5.475.107,7.409a10.135,10.135,0,0,0,.632,3.405,6.057,6.057,0,0,0,3.478,3.478,10.138,10.138,0,0,0,3.4.632c1.933.088,2.512.106,7.408.106s5.475-.018,7.409-.106a10.138,10.138,0,0,0,3.405-.632,6.057,6.057,0,0,0,3.478-3.478,10.136,10.136,0,0,0,.632-3.405c.088-1.934.106-2.514.106-7.409s-.018-5.475-.106-7.408a10.133,10.133,0,0,0-.632-3.4,6.053,6.053,0,0,0-3.478-3.478A10.135,10.135,0,0,0,647.409,7186.131Zm-14.967-3.3c1.955-.09,2.578-.11,7.558-.11s5.6.022,7.557.11a13.463,13.463,0,0,1,4.453.852,9.377,9.377,0,0,1,5.36,5.361,13.468,13.468,0,0,1,.854,4.45c.09,1.959.11,2.582.11,7.56s-.022,5.6-.11,7.559a13.441,13.441,0,0,1-.854,4.45,9.355,9.355,0,0,1-5.36,5.361,13.454,13.454,0,0,1-4.45.854c-1.956.09-2.58.11-7.56.11s-5.6-.022-7.558-.11a13.434,13.434,0,0,1-4.45-.854,9.366,9.366,0,0,1-5.363-5.36,13.518,13.518,0,0,1-.852-4.45c-.09-1.958-.11-2.581-.11-7.56s.022-5.6.11-7.556a13.476,13.476,0,0,1,.852-4.454,9.39,9.39,0,0,1,5.361-5.361,13.515,13.515,0,0,1,4.45-.852Z"
            transform="translate(-621.667 -7182.721)"
            fill="#eb6860"
            fillRule="evenodd"
          />
        </svg>
      ),
      url: "",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="33.336"
          viewBox="0 0 35 33.336"
        >
          <path
            id="Path_297"
            data-name="Path 297"
            d="M738.334,7198.59c0-7.832-7.857-14.207-17.5-14.207s-17.5,6.375-17.5,14.207c0,7.019,6.226,12.9,14.634,14.014.57.119,1.344.377,1.544.861a3.585,3.585,0,0,1,.057,1.578l-.239,1.487c-.069.438-.354,1.727,1.527.94s10.088-5.946,13.762-10.175A12.574,12.574,0,0,0,738.334,7198.59Zm-24.347,4.662h-3.482a.925.925,0,0,1-.923-.918v-6.956a.921.921,0,1,1,1.841,0v6.038h2.564a.918.918,0,0,1,0,1.836Zm3.595-.918a.917.917,0,1,1-1.834,0v-6.956a.918.918,0,1,1,1.835,0Zm8.374,0a.925.925,0,0,1-.923.917.924.924,0,0,1-.747-.365l-3.561-4.842v4.289a.917.917,0,0,1-1.835,0v-6.956a.927.927,0,0,1,.627-.871.836.836,0,0,1,.284-.047.951.951,0,0,1,.723.371l3.589,4.853v-4.306a.921.921,0,1,1,1.841,0Zm5.615-4.4a.916.916,0,0,1,.879.561.925.925,0,0,1-.207,1.022.919.919,0,0,1-.31.2.932.932,0,0,1-.362.061h-2.558v1.64h2.558a.932.932,0,0,1,.365.057.921.921,0,0,1,.524.5.911.911,0,0,1,0,.724.921.921,0,0,1-.889.556H728.1a.918.918,0,0,1-.915-.918v-6.956a.92.92,0,0,1,.915-.922h3.482a.92.92,0,0,1-.006,1.839h-2.558v1.641Z"
            transform="translate(-703.334 -7184.383)"
            fill="#eb6860"
          />
        </svg>
      ),
      url: "",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33.333"
          height="33.541"
          viewBox="0 0 33.333 33.541"
        >
          <path
            id="Path_293"
            data-name="Path 293"
            d="M786.905,7214.228v-16.77h7.738a1.792,1.792,0,0,0,1.786-1.8v-7.786H813.1v26.353Zm5.953-26.063v5.7h-5.664Zm-9.524,5.99v20.073a3.583,3.583,0,0,0,3.571,3.594H813.1a3.583,3.583,0,0,0,3.571-3.594v-26.353a3.583,3.583,0,0,0-3.571-3.594h-19.95a3.561,3.561,0,0,0-2.525,1.053l-6.241,6.28A3.605,3.605,0,0,0,783.334,7194.155Z"
            transform="translate(-783.334 -7184.281)"
            fill="#eb6860"
          />
        </svg>
      ),
      url: "",
    },
  ];

  return (
    <VStack alignItems="center" spacing="0">
      <CText
        textProps={{
          mt: { base: "137px", md: "300px" },
          variant: "redText",
          textAlign: "center",
        }}
        text={<>リアルユーザーから見た「ママの休食」って？</>}
        textMobile={
          <>
            リアルユーザーから見た
            <br />
            ママの休食」って？
          </>
        }
      />
      <CText
        textProps={{
          mt: "32px",
          fontFamily: "Yu Gothic Pr6N",
          color: "#493E34",
          fontSize: { base: "25px", md: "40px" },
          letterSpacing: { base: "2.0", md: "1.5" },
          lineHeight: { base: "35px", md: "70px" },
          textAlign: "center",
        }}
        text={<>お客様からのメッセージをご紹介</>}
        textMobile={
          <>
            お客様からの
            <br />
            メッセージをご紹介
          </>
        }
      />
      <Flex justify="center" mt={{ base: "67px", md: "75px" }}>
        <PrimaryButton
          title="お客様の声"
          href="#"
          buttonProps={{ minW: "250px" }}
        />
      </Flex>
      <Box mt={{ base: "130px", md: "180px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="25"
          viewBox="0 0 128 25"
        >
          <text
            id="Follow_us_"
            data-name="Follow us !"
            transform="translate(64 19)"
            fill="#eb6860"
            fontSize="25"
            fontFamily="Helvetica"
            letterSpacing="0.03em"
          >
            <tspan x="-63.491" y="0">
              Follow us !
            </tspan>
          </text>
        </svg>
      </Box>
      <Flex
        w={{ base: "190px", md: "365px" }}
        pt={{ base: "30px", md: "27px" }}
        pb={{ base: "150px", md: "120px" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Flex alignItems="center">
          <Box as="a" href={sns[0].url} mr={{ base: "33px", md: "45px" }}>
            {sns[0].icon}
          </Box>
          <Box as="a" href={sns[1].url} mr={{ base: "33px", md: "45px" }}>
            {sns[1].icon}
          </Box>
          <Box as="a" href={sns[2].url}>
            {sns[2].icon}
          </Box>
        </Flex>
        <Flex alignItems="center" mt={{ base: "33px", md: "0" }}>
          <Box as="a" href={sns[4].url} mr={{ base: "33px", md: "45px" }}>
            {sns[4].icon}
          </Box>
          <Box as="a" href={sns[3].url}>
            {sns[3].icon}
          </Box>
        </Flex>
      </Flex>
      <Image w="100vw" src={url} alt={url} fallbackSrc={url} />
    </VStack>
  );
};

/**
 * @desc THE MAIN PAGE
 */
const AboutPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const AboutEl = [
    <ConceptSection1 />,
    <ConceptSection2 />,
    <ConceptSection3 />,
    <ConceptSection4 />,
  ];
  return (
    <>
      <Hero />
      <ContainerSection>
        {isMobile
          ? AboutEl.map((el, i) => <Box key={i}>{el}</Box>)
          : AboutEl.map((el, i) => <Box key={i}>{el}</Box>)}
      </ContainerSection>
      <Message />
      <FinalSection />
    </>
  );
};

EntryPoint(
  <ChakraProvider theme={about_theme}>
    <AboutPage />
  </ChakraProvider>
);
