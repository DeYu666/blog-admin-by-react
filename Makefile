TARGETS := blog-admin-by-react
TARGETS_BASE :=  blog-admin-by-react-base
BUILD := $(shell git rev-parse --short HEAD)
VERSION := $(shell git rev-parse --abbrev-ref HEAD)-$(BUILD)

IMAGE_NAME :=  blog-admin-by-react-service
IMAGE_VERSION := $(IMAGE_NAME):$(VERSION)
REGISTRY_ADDRESS ?= registry.hub.docker.com
IMAGE_FULLNAME := $(REGISTRY_ADDRESS)/deyu666/$(IMAGE_VERSION)
CURRENT_BRANCH_NAME := `git name-rev --name-only HEAD`
BASE_PRE := /it/

all: build

$(TARGETS):
	cnpm install
	npm run build

build: $(TARGETS)

clean-win:
	rmdir /s/q build