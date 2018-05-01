// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var prismatica_report_renderer_pb = require('./prismatica_report_renderer_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_prismatica_report_renderer_RenderRequest(arg) {
  if (!(arg instanceof prismatica_report_renderer_pb.RenderRequest)) {
    throw new Error('Expected argument of type prismatica_report_renderer.RenderRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_prismatica_report_renderer_RenderRequest(buffer_arg) {
  return prismatica_report_renderer_pb.RenderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_prismatica_report_renderer_RenderResponse(arg) {
  if (!(arg instanceof prismatica_report_renderer_pb.RenderResponse)) {
    throw new Error('Expected argument of type prismatica_report_renderer.RenderResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_prismatica_report_renderer_RenderResponse(buffer_arg) {
  return prismatica_report_renderer_pb.RenderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_prismatica_report_renderer_TemplateRegistrationRequest(arg) {
  if (!(arg instanceof prismatica_report_renderer_pb.TemplateRegistrationRequest)) {
    throw new Error('Expected argument of type prismatica_report_renderer.TemplateRegistrationRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_prismatica_report_renderer_TemplateRegistrationRequest(buffer_arg) {
  return prismatica_report_renderer_pb.TemplateRegistrationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_prismatica_report_renderer_TemplateRegistrationResponse(arg) {
  if (!(arg instanceof prismatica_report_renderer_pb.TemplateRegistrationResponse)) {
    throw new Error('Expected argument of type prismatica_report_renderer.TemplateRegistrationResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_prismatica_report_renderer_TemplateRegistrationResponse(buffer_arg) {
  return prismatica_report_renderer_pb.TemplateRegistrationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PrismaticaReportRendererService = exports.PrismaticaReportRendererService = {
  render: {
    path: '/prismatica_report_renderer.PrismaticaReportRenderer/Render',
    requestStream: false,
    responseStream: false,
    requestType: prismatica_report_renderer_pb.RenderRequest,
    responseType: prismatica_report_renderer_pb.RenderResponse,
    requestSerialize: serialize_prismatica_report_renderer_RenderRequest,
    requestDeserialize: deserialize_prismatica_report_renderer_RenderRequest,
    responseSerialize: serialize_prismatica_report_renderer_RenderResponse,
    responseDeserialize: deserialize_prismatica_report_renderer_RenderResponse,
  },
  registerTemplate: {
    path: '/prismatica_report_renderer.PrismaticaReportRenderer/RegisterTemplate',
    requestStream: false,
    responseStream: false,
    requestType: prismatica_report_renderer_pb.TemplateRegistrationRequest,
    responseType: prismatica_report_renderer_pb.TemplateRegistrationResponse,
    requestSerialize: serialize_prismatica_report_renderer_TemplateRegistrationRequest,
    requestDeserialize: deserialize_prismatica_report_renderer_TemplateRegistrationRequest,
    responseSerialize: serialize_prismatica_report_renderer_TemplateRegistrationResponse,
    responseDeserialize: deserialize_prismatica_report_renderer_TemplateRegistrationResponse,
  },
};

exports.PrismaticaReportRendererClient = grpc.makeGenericClientConstructor(PrismaticaReportRendererService);
