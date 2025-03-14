<template>
  <a-layout-header :style="headStyle">
    <a-flex class="head-left" style="width: 50%">
      <a-space>
        <img
          src="@/assets/logo.png"
          alt="logo"
          width="40"
          height="40"
          style="object-fit: contain; margin-top: -4px"
        />
      </a-space>
      <!--<a-flex gap="10" style="width: 100%">-->
      <!--  <SoundOutlined style="font-size: 18px; color: #fa8c16" />-->
      <!--  <a-carousel dot-position="right" :dots="false" autoplay class="carousel">-->
      <!--    <div class="carousel-item">-->
      <!--      安徽亨丰服饰有限公司：虚开增值税专用发票或者虚开用于骗取出口退税、抵扣税款的其他发票-->
      <!--    </div>-->
      <!--    <div class="carousel-item">-->
      <!--      临泉县宏康油脂有限公司：虚开增值税专用发票或者虚开用于骗取出口退税、抵扣税款的其他发票-->
      <!--    </div>-->
      <!--    <div class="carousel-item">-->
      <!--      临泉县正大鞋材有限公司：虚开增值税专用发票或者虚开用于骗取出口退税、抵扣税款的其他发票-->
      <!--    </div>-->
      <!--    <div class="carousel-item">-->
      <!--      合肥耐杰科技有限公司：虚开增值税专用发票或者虚开用于骗取出口退税、抵扣税款的其他发票-->
      <!--    </div>-->
      <!--    <div class="carousel-item">-->
      <!--      太和县乐鑫塑业有限公司：虚开增值税专用发票或者虚开用于骗取出口退税、抵扣税款的其他发票-->
      <!--    </div>-->
      <!--  </a-carousel>-->
      <!--</a-flex>-->
    </a-flex>
    <a-flex class="head-right" align="center" gap="5">
      <!--<SkinPeeler />-->
      <!--<a-tooltip placement="bottom" title="消息中心">-->
      <!--  <a-badge :dot="true" :offset="[-10, 10]">-->
      <!--    <a-button-->
      <!--      type="text"-->
      <!--      size="large"-->
      <!--      :icon="h(BellOutlined)"-->
      <!--      @click="toPath('/msgCenter')"-->
      <!--    ></a-button>-->
      <!--  </a-badge>-->
      <!--</a-tooltip>-->
      <!--<a-tooltip placement="bottom" title="常见问题">-->
      <!--  <a-button type="text" size="large" :icon="h(QuestionCircleOutlined)"></a-button>-->
      <!--</a-tooltip>-->
      <a-dropdown style="margin-left: 5px">
        <a style="color: var(--first-lv-text)" @click.prevent>
          <a-flex align="center" :gap="5">
            <a-avatar :src="userStore.userInfo.avatar" />
            {{ userStore.userInfo.nickName }}
          </a-flex>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="goUserCenter"> <UserOutlined /> 个人中心 </a-menu-item>
            <a-menu-item @click="logout"> <LoginOutlined /> 退出登录 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-flex>
  </a-layout-header>
</template>

<script setup lang="ts">
  import { type CSSProperties, h } from 'vue';
  import { UserOutlined, LoginOutlined } from '@ant-design/icons-vue';
  // import SkinPeeler from '@/components/SkinPeeler/SkinPeeler.vue';
  import router from '@/router';
  import { useUserStore } from '@/stores/user';
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
  import { message, Modal } from 'ant-design-vue';

  const userStore = useUserStore();

  const headStyle: CSSProperties = {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '24px',
  };

  function logout() {
    Modal.confirm({
      title: '提示',
      content: '确定退出登录吗？',
      onOk() {
        userStore.logout().then(() => {
          message.success('退出成功');
        });
      },
    });
  }

  function goUserCenter() {
    router.push('/userCenter');
  }
</script>

<style scoped lang="scss">
  .carousel-item {
    transition: all 0.2s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .carousel-item:hover {
    cursor: pointer;
    color: #1677ff;
  }
  .carousel {
    width: 100%;
    height: 22px;
  }
</style>
