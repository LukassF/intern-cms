import { defineComponent, h, ref, watchSyncEffect } from "vue";

export const OverlayWrapper = defineComponent({
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },

  setup(props, { slots }) {
    const display = ref("hidden");
    const opacity = ref("bg-[rgb(0,0,0,0)]");

    const handleOverlayClick = (e: Event) => {
      if (e.target === e.currentTarget) {
        props.onClose();
        opacity.value = "bg-[rgb(0,0,0,0)]";

        setTimeout(() => {
          display.value = "hidden";
        }, 400);
      }
    };

    watchSyncEffect(() => {
      if (props.open) {
        display.value = "fixed";

        setTimeout(() => {
          opacity.value = "bg-[rgb(0,0,0,0.5)]";
        }, 0);
      } else {
        opacity.value = "bg-[rgb(0,0,0,0)]";

        props.onClose();
        setTimeout(() => {
          display.value = "hidden";
        }, 400);
      }
    });

    return () =>
      h(
        "div",
        {
          class: `w-screen h-screen inset-0 z-10 ${display.value} ${opacity.value} transition-colors duration-[400ms] ease-out`,
          onClick: handleOverlayClick,
        },
        [slots.default && slots.default()]
      );
  },
});
