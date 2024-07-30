// vite.config.ts
import { defineConfig } from "file:///Users/choejuyeong/Desktop/dev/over-brain/.yarn/__virtual__/vite-virtual-ba1f3cd0cb/4/.yarn/berry/cache/vite-npm-5.0.7-583fea8b6f-10c0.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/choejuyeong/Desktop/dev/over-brain/.yarn/__virtual__/@vitejs-plugin-react-virtual-2ef9140ad3/4/.yarn/berry/cache/@vitejs-plugin-react-npm-4.2.1-8b9705c544-10c0.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgrPlugin from "file:///Users/choejuyeong/Desktop/dev/over-brain/.yarn/__virtual__/vite-plugin-svgr-virtual-3c6591de5e/4/.yarn/berry/cache/vite-plugin-svgr-npm-4.2.0-e0c6a7a1f0-10c0.zip/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true
      }
    })
  ],
  optimizeDeps: {
    include: ["react-icons/ai"]
  },
  cacheDir: "./.vite",
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hvZWp1eWVvbmcvRGVza3RvcC9kZXYvb3Zlci1icmFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Nob2VqdXllb25nL0Rlc2t0b3AvZGV2L292ZXItYnJhaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Nob2VqdXllb25nL0Rlc2t0b3AvZGV2L292ZXItYnJhaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgc3ZnclBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHN2Z3JQbHVnaW4oe1xuICAgICAgc3Znck9wdGlvbnM6IHtcbiAgICAgICAgaWNvbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsncmVhY3QtaWNvbnMvYWknXSxcbiAgfSxcbiAgY2FjaGVEaXI6ICcuLy52aXRlJyxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7IGZpbmQ6ICdAY29tcG9uZW50cycsIHJlcGxhY2VtZW50OiAnL3NyYy9jb21wb25lbnRzJyB9LFxuICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiAnL3NyYycgfSxcbiAgICBdLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsb0JBQW9CO0FBQzFVLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUd2QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsTUFDVCxhQUFhO0FBQUEsUUFDWCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxnQkFBZ0I7QUFBQSxFQUM1QjtBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLGVBQWUsYUFBYSxrQkFBa0I7QUFBQSxNQUN0RCxFQUFFLE1BQU0sS0FBSyxhQUFhLE9BQU87QUFBQSxJQUNuQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
