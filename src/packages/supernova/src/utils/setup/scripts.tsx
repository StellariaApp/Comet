type Props = {
  default: string;
};

export const SetupThemeScript = (props: Props) => {
  const { default: def } = props;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      (function() {
        const getTheme = localStorage.getItem("theme");
        const theme = document.documentElement.dataset.theme;
        if (getTheme) {
          document.documentElement.dataset.theme = getTheme;
        }
        if (!getTheme && !theme && ${Boolean(def)}) {
          document.documentElement.dataset.theme = "${def}";
        }
      })();
    `
      }}
      type="text/javascript"
    />
  );
};
