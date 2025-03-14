<template>
  <a-modal
    :open="open"
    title="修改头像"
    destroy-on-close
    width="700px"
    @ok="changeAvatar"
    @cancel="handleCancel"
  >
    <a-flex gap="50" justify="center" align="center">
      <div class="cropper">
        <vueCropper ref="cropper" v-bind="options" @realTime="realTime"></vueCropper>
      </div>
      <div class="show-preview">
        <img :src="previews.url" :style="previews.img" alt="" />
      </div>
    </a-flex>
    <a-flex gap="10">
      <a-upload
        name="file"
        action="#"
        accept="jpg,png,jpeg"
        :maxCount="1"
        :showUploadList="false"
        :customRequest="customRequest"
        :beforeUpload="beforeUpload"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          上传图片
        </a-button>
      </a-upload>
      <a-button :icon="h(PlusOutlined)" @click="changeScale(1)">放大图片</a-button>
      <a-button :icon="h(MinusOutlined)" @click="changeScale(-1)">缩小图片</a-button>
      <a-button :icon="h(RedoOutlined)" @click="changeRotate('rotateLeft')">左旋转</a-button>
      <a-button :icon="h(UndoOutlined)" @click="changeRotate('rotateRight')">右旋转</a-button>
    </a-flex>
  </a-modal>
</template>

<script setup lang="ts">
  import { VueCropper } from 'vue-cropper';
  import 'vue-cropper/dist/index.css';
  import { h } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useBaseConfig } from '@/hooks/useBaseConfig';
  import {
    PlusOutlined,
    MinusOutlined,
    RedoOutlined,
    UndoOutlined,
    UploadOutlined,
  } from '@ant-design/icons-vue';
  import { message, type UploadProps } from 'ant-design-vue';
  import { uploadAvatarApi } from '@/api/user';

  const userStore = useUserStore();
  const baseConfig = useBaseConfig();

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:open']);
  watch(
    () => props.open,
    (newValue) => {
      options.img = userStore.userInfo.avatar;
    },
  );
  function handleCancel() {
    emit('update:open', false);
  }
  const cropper = ref();
  const options = reactive({
    img: userStore.userInfo.avatar,
    fixedBox: true,
    autoCrop: true,
    autoCropWidth: 200,
    autoCropHeight: 200,
    fixed: true,
  });
  const previews = ref({ url: options.img, img: {} });

  interface RealTimeData {
    div: { width: string; height: string };
    h: number;
    w: number;
    html: number;
    img: { height: string; width: string; transform: string };
    url: string;
  }
  function realTime(data: RealTimeData) {
    previews.value = data;
  }
  function changeScale(number: number) {
    cropper.value?.changeScale(number);
  }
  function changeRotate(type: string) {
    cropper.value[type]();
  }

  function customRequest() {}
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    if (file.type.indexOf('image/') == -1) {
      message.warn('只能上传png、jpg、jpeg格式的图片');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        options.img = reader.result as string;
      };
    }
    return false;
  };

  function changeAvatar() {
    cropper.value.getCropBlob((data: Blob) => {
      let formData = new FormData();
      formData.append('avatarfile', data);
      uploadAvatarApi(formData).then((response: Recordable) => {
        userStore.setUserAvatar(response.imgUrl);
        message.success('修改头像成功');
        handleCancel();
      });
    });
  }
</script>

<style scoped lang="scss">
  .cropper {
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
  .show-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--border-color);
  }
</style>
