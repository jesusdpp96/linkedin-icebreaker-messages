"use client";

/**
 * Message result modal component
 * Displays the generated messages in a modal
 */
import { useState } from "react";
import Image from "next/image";
import type { Message } from "@/types/message-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/modal";
import { Loader2, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { buttonStyles } from "@/utils/styles";
import Linkedin from "../../assets/linkedin.png";

interface MessageResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  messages: Message[];
}

export function MessageResultModal({
  isOpen,
  onClose,
  isLoading,
  messages,
}: MessageResultModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isLoading && !open && onClose()}
    >
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700"
        hideCloseButton={isLoading}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
            {isLoading ? "Generando mensajes" : "Mensajes generados"}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-linkedin animate-spin mb-4" />
            <p className="text-lg text-zinc-300">
              Estamos generando tus mensajes, por favor espera...
            </p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {messages.map((message, index) => (
              <Card
                key={index}
                className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Category Badge */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span
                          className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full"
                          style={{
                            backgroundColor:
                              message.templateCategory === "Conexión"
                                ? "#0077B5"
                                : message.templateCategory === "Pregunta"
                                ? "#0A66C2"
                                : message.templateCategory === "Felicitación"
                                ? "#0073B1"
                                : "#006097",
                          }}
                        >
                          {message.templateCategory}
                        </span>
                        <h3 className="mt-2 text-lg font-bold text-white">
                          {message.templateTitle}
                        </h3>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(message.message, index)}
                        className={buttonStyles.primary}
                        size="sm"
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar mensaje
                          </>
                        )}
                      </Button>
                    </div>

                    {/* LinkedIn Message Simulation */}
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <div className="flex justify-end items-center space-x-2 gap-2 mb-2">
                        <div className="bg-white p-1 rounded-full">
                          <Image
                            src={Linkedin}
                            alt="LinkedIn"
                            width={16}
                            height={16}
                          />
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
                              message.receiverProfilePicture ||
                              "/placeholder.svg"
                            }
                            alt={message.receiverName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {message.receiverName}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {message.receiverHeadline}
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div
                        className="border-t border-gray-200 my-4"
                        aria-hidden="true"
                        role="separator"
                      ></div>
                      <div style={{ marginLeft: "2.5rem", marginTop: "2rem" }}>
                        {/* Sender Info */}
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={
                                message.senderProfilePicture ||
                                "/placeholder.svg"
                              }
                              alt={message.senderName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {message.senderName}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-1">
                              {message.senderHeadline}
                            </p>
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className="bg-gray-100 rounded-lg p-4 mb-4">
                          <p className="text-gray-800">{message.message}</p>
                        </div>
                      </div>
                    </div>

                    {/* Instruction */}
                    <div className="bg-linkedin-dark/20 border border-linkedin/30 rounded-lg p-4">
                      <h4 className="font-semibold text-linkedin-light mb-2">
                        Instrucción:
                      </h4>
                      <p className="text-sm text-zinc-300">
                        {message.instruction}
                      </p>
                    </div>

                    {/* Source Posts */}
                    {message.sourcePosts && message.sourcePosts.length > 0 && (
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-zinc-300 mb-2">
                          Posts relacionados:
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {message.sourcePosts.map((post, postIndex) => (
                            <a
                              key={postIndex}
                              href={post}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm text-linkedin hover:text-linkedin-light transition-colors"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Ver post en LinkedIn
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <DialogFooter>
          {!isLoading && (
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-700 bg-zinc-800"
                onClick={onClose}
              >
                Cerrar
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
