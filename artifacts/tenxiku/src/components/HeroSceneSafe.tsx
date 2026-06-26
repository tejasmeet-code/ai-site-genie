import { Component, type ReactNode } from "react";
import { HeroScene } from "./HeroScene";

interface Props {
  className?: string;
}

interface State {
  hasError: boolean;
}

class HeroSceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={`flex items-center justify-center ${this.props.className ?? ""}`}>
          <div className="relative flex items-center justify-center">
            <div
              className="h-64 w-64 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, oklch(0.62 0.21 265) 0%, transparent 70%)",
                animation: "pulse 4s ease-in-out infinite",
              }}
            />
            <div
              className="absolute h-48 w-48 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, oklch(0.7 0.25 280) 0%, transparent 70%)",
                animation: "pulse 4s ease-in-out infinite 1s",
              }}
            />
            <div className="absolute h-32 w-32 rounded-full border border-white/20" />
            <div className="absolute h-20 w-20 rounded-full border border-white/10" />
          </div>
        </div>
      );
    }
    return <HeroScene className={this.props.className} />;
  }
}

export { HeroSceneErrorBoundary as HeroScene };
