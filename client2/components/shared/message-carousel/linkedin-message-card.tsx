/**
 * LinkedIn message card component
 * Displays a LinkedIn message in a card format
 */
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Linkedin from "../../../assets/linkedin.png";

interface LinkedInMessageCardProps {
  slide: {
    colorCategory: string;
    messageCategory: string;
    titleCategory: string;
    linkedinSimulationMessage: {
      receiverName: string;
      receiverProfilePicture: string;
      receiverHeadline: string;
      senderName: string;
      senderProfilePicture: string;
      senderHeadline: string;
      message: string;
    };
  };
  isFocused: boolean;
  position: "prev" | "active" | "next" | "hidden";
}

export function LinkedInMessageCard({
  slide,
  isFocused,
  position,
}: LinkedInMessageCardProps) {
  const {
    colorCategory,
    messageCategory,
    titleCategory,
    linkedinSimulationMessage,
  } = slide;

  // Determine the color of background based on position
  const getBackgroundColor = () => {
    if (position === "active") {
      return "#086bc9"; // LinkedIn primary color for active slide
    } else if (position === "prev") {
      return "#064e94"; // Dark blue for previous slide
    } else if (position === "next") {
      return "#8bb8e0"; // Light blue for next slide
    } else {
      return "#333333"; // Color for hidden slides
    }
  };

  return (
    <Card
      className="h-full w-full overflow-hidden shadow-xl"
      style={{
        backgroundColor: getBackgroundColor(),
      }}
    >
      <CardContent className="p-6">
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              color: colorCategory,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {messageCategory}
          </span>
          <h3 className="mt-2 text-xl font-bold text-white">{titleCategory}</h3>
        </div>

        {/* LinkedIn Message Simulation */}
        <Card className="bg-white shadow-lg overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-end items-center space-x-2 gap-2 mb-2">
              <div className="bg-white p-1 rounded-full">
                <Image src={Linkedin} alt="LinkedIn" width={16} height={16} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                LinkedIn
              </span>
            </div>
            {/* Receiver Info */}
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                <Image
                  src={
                    linkedinSimulationMessage.receiverProfilePicture ||
                    "/placeholder.svg"
                  }
                  alt={linkedinSimulationMessage.receiverName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {linkedinSimulationMessage.receiverName}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-1">
                  {linkedinSimulationMessage.receiverHeadline}
                </p>
              </div>
            </div>
            {/* Divider */}
            <div
              className="border-t border-gray-100 my-4"
              aria-hidden="true"
              role="separator"
            ></div>
            <div style={{ marginLeft: "2.5rem", marginTop: "2rem" }}>
              {/* Sender Info */}
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={
                      linkedinSimulationMessage.senderProfilePicture ||
                      "/placeholder.svg"
                    }
                    alt={linkedinSimulationMessage.senderName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {linkedinSimulationMessage.senderName}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {linkedinSimulationMessage.senderHeadline}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-800">
                  {linkedinSimulationMessage.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
