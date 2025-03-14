<template>
  <div :ref="id" />
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useAppStore } from '@/stores/app';
  import { useUserStore } from '@/stores/user';
  import type { EventParams } from './eventType';

  const appStore = useAppStore();
  const userStore = useUserStore();

  type EChartsOption = echarts.EChartsOption;

  const emit = defineEmits(['click', 'mousemove', 'mouseout']);
  const props = defineProps({
    id: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  });
  const chartDom: Ref<any, any> = useTemplateRef<Ref<any, any>>(props.id as string);

  const baseOption: EChartsOption = {
    backgroundColor: 'transparent',
  };
  const isActivated = ref(false);
  onActivated(() => {
    isActivated.value = true;
  });
  onDeactivated(() => {
    isActivated.value = false;
  });
  const chartOptions = computed(() => {
    return Object.assign(baseOption, unref(props.options));
  });
  onMounted(() => {
    isActivated.value = true;
    createChart();
  });
  watch(
    [
      () => appStore.theme.mode,
      () => userStore.inCompany.nsrsbh,
      () => props.options,
      chartOptions,
      isActivated,
    ],
    async () => {
      await nextTick();
      if (unref(chartDom)) {
        createChart();
      }
    },
    { deep: true },
  );

  let myChart: any = null;
  let chartIns = ref();
  function createChart() {
    myChart && myChart.dispose();
    myChart = echarts.init(unref(chartDom), appStore.theme.mode);
    chartIns.value = myChart;
    const option = unref(chartOptions);
    option && myChart.setOption(option);
    myChart.on('click', (e: EventParams) => {
      emit('click', e);
    });
    myChart.on('mousemove', (e: EventParams) => {
      emit('mousemove', e);
    });
    myChart.on('mouseout', (e: EventParams) => {
      emit('mouseout', e);
    });
  }

  window.addEventListener('resize', () => {
    myChart.resize();
  });

  defineExpose({
    chartIns,
  });
</script>

<style scoped lang="scss"></style>
